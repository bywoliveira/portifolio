"""Gera versões públicas (tarjadas) de certificados em PDF.

Remove DE FATO do arquivo (redação com PyMuPDF, não uma simples sobreposição):
  * números de documento de identidade (RG, CPF/CIN);
  * data de nascimento (ex.: "nascida a 1 de janeiro de 2000");
  * códigos de controle/autenticação e QR codes (identificam a pessoa e levam
    a páginas que exibem o documento original completo);
  * links clicáveis e metadados do PDF.

Depois de salvar, o script reabre cada PDF e interrompe tudo se qualquer padrão
sensível ainda aparecer no texto ou nos fluxos internos do arquivo.

Uso:
    python tarjar_certificados.py <pasta_com_pdfs_originais> <pasta_de_saida>

Os nomes de saída seguem o mapa em `certificados.json` (arquivo original -> slug).
Arquivos fora do mapa recebem um slug gerado a partir do nome.
"""
from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path

import pymupdf as fitz

NAVY = (0.10, 0.16, 0.31)

# Padrões genéricos: nenhum dado pessoal real fica escrito neste arquivo.
PATTERNS = [
    re.compile(r"\bRG\s*\d{1,2}\.?\d{3}\.?\d{3}-?[\dxX]\b(?:/[A-Z]{2})?"),   # RG 00.000.000-0/SP
    re.compile(r"\b\d{3}\.\d{3}\.\d{3}-\d{2}\b"),                           # CPF / CIN
    re.compile(r"(?<=nascid[ao] a )\d{1,2} de [a-zçãé]+ de \d{4}", re.I),   # data de nascimento
    re.compile(r"\b[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}\b"),     # código de controle
    re.compile(r"\S*consulta-certificado\S*|\S*qrcode=\S*"),                # link de autenticação
]
# Na verificação final (texto + fluxos binários) usa-se versões sem "\S*" no início,
# que seriam lentíssimas em dados binários longos.
VERIFY = PATTERNS[:4] + [re.compile(r"consulta-certificado|qrcode=")]


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def tight(rect: fitz.Rect) -> fitz.Rect:
    """Retângulo um pouco mais baixo que a linha, para não atingir linhas vizinhas."""
    pad = rect.height * 0.22
    return fitz.Rect(rect.x0 - 0.5, rect.y0 + pad, rect.x1 + 0.5, rect.y1 - pad)


def page_lines(page: fitz.Page) -> list[str]:
    lines = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            lines.append("".join(span["text"] for span in line["spans"]))
    return lines


def redact(src: Path, dst: Path) -> None:
    doc = fitz.open(src)
    for page in doc:
        # 1) texto sensível (procura por linha e tarja cada ocorrência literal)
        hits: set[str] = set()
        for line in page_lines(page):
            for pattern in PATTERNS:
                hits.update(m.group(0).strip() for m in pattern.finditer(line) if m.group(0).strip())
        for literal in hits:
            for rect in page.search_for(literal):
                page.add_redact_annot(tight(rect), fill=NAVY)
        # mantém as imagens: o fundo do certificado cobre a página inteira
        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)

        # 2) QR codes: imagens pequenas e quadradas -> apaga os pixels
        qr_rects = [
            rect
            for img in page.get_images(full=True)
            for rect in page.get_image_rects(img[0])
            if abs(rect.width - rect.height) < 3 and rect.width < 60
        ]
        for rect in qr_rects:
            page.add_redact_annot(rect, fill=NAVY)
        if qr_rects:
            page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_PIXELS)

        # 3) links clicáveis
        for link in page.get_links():
            page.delete_link(link)

    doc.set_metadata({k: "" for k in ("producer", "creator", "title", "author", "subject", "keywords")})
    doc.del_xml_metadata()
    doc.save(dst, garbage=4, deflate=True, clean=True)
    doc.close()
    verify(dst)


def verify(path: Path) -> None:
    doc = fitz.open(path)
    text = "\n".join(page.get_text() for page in doc)
    streams = b"".join(
        doc.xref_stream(x) or b"" for x in range(1, doc.xref_length()) if doc.xref_is_stream(x)
    ).decode("latin-1", "ignore")
    doc.close()
    for pattern in VERIFY:
        if pattern.search(text) or pattern.search(streams):
            raise SystemExit(f"ATENÇÃO: dado sensível ainda presente em {path.name} ({pattern.pattern})")


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    src_dir, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)
    mapping_file = Path(__file__).with_name("certificados.json")
    mapping = json.loads(mapping_file.read_text(encoding="utf-8")) if mapping_file.exists() else {}
    for src in sorted(src_dir.glob("*.pdf")):
        slug = mapping.get(src.name) or slugify(src.stem.replace("Certificado_", ""))
        dst = out_dir / f"{slug}.pdf"
        redact(src, dst)
        print(f"ok  {dst.name}")


if __name__ == "__main__":
    main()

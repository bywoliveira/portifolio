"""Gera as imagens públicas dos certificados a partir dos PDFs JÁ TARJADOS.

Rode depois de `tarjar_certificados.py`. Saídas por certificado (<slug>):
  <saida>/<slug>-thumb.webp   miniatura da página 1 (440 px de largura)
  <saida>/<slug>-p1.webp      página 1 ampliada (1400 px)
  <saida>/<slug>-p2.webp      conteúdo da página 2 (verso), recortado (1400 px)

Uso:
    python gerar_imagens.py public/certificados/pdf public/certificados/img
"""
import sys
from pathlib import Path

import pymupdf as fitz
from PIL import Image

FULL_W = 1400
THUMB_W = 440


def render(page: "fitz.Page", width: int) -> Image.Image:
    zoom = width / page.rect.width
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def first_content_block(img: Image.Image, gap: int = 140, margin: int = 36) -> Image.Image:
    """Recorta o primeiro bloco de conteúdo (ignora o vazio do resto da página)."""
    gray = img.convert("L")
    w, h = gray.size
    px = gray.load()
    rows = [any(px[x, y] < 235 for x in range(0, w, 3)) for y in range(h)]
    start = next((y for y, r in enumerate(rows) if r), 0)
    end, blank = start, 0
    for y in range(start, h):
        if rows[y]:
            end, blank = y, 0
        else:
            blank += 1
            if blank > gap:
                break
    top = max(0, start - margin)
    bottom = min(h, end + margin)
    return img.crop((0, top, w, bottom))


def main() -> None:
    src_dir, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)
    for pdf in sorted(src_dir.glob("*.pdf")):
        slug = pdf.stem
        doc = fitz.open(pdf)
        p1 = render(doc[0], FULL_W)
        p1.save(out_dir / f"{slug}-p1.webp", "WEBP", quality=80, method=6)
        thumb = p1.resize((THUMB_W, round(p1.height * THUMB_W / p1.width)), Image.LANCZOS)
        thumb.save(out_dir / f"{slug}-thumb.webp", "WEBP", quality=74, method=6)
        if doc.page_count > 1:
            p2 = first_content_block(render(doc[1], FULL_W))
            p2.save(out_dir / f"{slug}-p2.webp", "WEBP", quality=82, method=6)
        sizes = {f.name: f.stat().st_size // 1024 for f in out_dir.glob(f"{slug}-*.webp")}
        print(slug, sizes)
        doc.close()


if __name__ == "__main__":
    main()

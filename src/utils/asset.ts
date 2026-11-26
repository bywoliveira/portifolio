/**
 * Monta o caminho de um arquivo da pasta `public/`.
 *
 * O caminho é sempre RELATIVO ao index.html ("./img/foto.webp"). Assim o mesmo build funciona
 * na raiz de um domínio (Vercel) e em subpastas (GitHub Pages: usuario.github.io/repositorio/),
 * e o HTML pré-renderizado no build é idêntico ao que o navegador gera ao hidratar.
 */
export function asset(path: string): string {
  return `./${path.replace(/^\.?\/+/, '')}`
}

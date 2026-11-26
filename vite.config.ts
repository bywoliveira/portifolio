import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * O HTML já chega pré-renderizado, então o JavaScript só começa a ser baixado depois da primeira
 * pintura: texto, fontes e CSS têm a rede só para eles, e as animações entram logo em seguida.
 */
function loadEntryAfterFirstPaint(): Plugin {
  return {
    name: 'carregar-js-apos-primeira-pintura',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        /<script type="module" crossorigin src="([^"]+)"><\/script>/,
        (_tag, src: string) =>
          `<script type="module">requestAnimationFrame(() => setTimeout(() => import('${src}')))</script>`,
      )
    },
  }
}

// `base: './'` gera caminhos relativos: o mesmo build funciona no GitHub Pages
// (https://usuario.github.io/repositorio/), na Vercel, na Netlify ou em qualquer pasta.
export default defineConfig({
  base: './',
  plugins: [react(), loadEntryAfterFirstPaint()],
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    // React + GSAP (com ScrollTrigger e SplitText) formam a maior parte do pacote; é esperado.
    chunkSizeWarningLimit: 650,
  },
})

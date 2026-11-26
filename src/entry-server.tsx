import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Renderização estática usada no build (scripts/prerender.mjs): o HTML da página já sai pronto
 * em dist/index.html. O texto aparece antes do JavaScript carregar (melhor LCP e SEO) e o React
 * só "hidrata" o que já está na tela.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

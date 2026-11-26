import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'

// Com animações ligadas à rolagem, é mais previsível sempre começar do topo ao recarregar.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// No build de produção o HTML já vem pré-renderizado: o React apenas hidrata — e só depois da
// primeira pintura, para o texto aparecer sem esperar o JavaScript trabalhar.
// Em desenvolvimento (npm run dev) a raiz chega vazia e é renderizada normalmente.
if (container.hasChildNodes()) {
  requestAnimationFrame(() => setTimeout(() => hydrateRoot(container, app), 0))
} else {
  createRoot(container).render(app)
}

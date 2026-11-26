/**
 * Logo original do Ákron (SVGs do repositório Nananilda/tcc, em public/akron/logo).
 * Aplicados como máscara CSS: a cor vem de `currentColor` e o arquivo não pesa no JavaScript.
 * Decorativo: o nome do projeto também aparece em texto no título da seção.
 */
export function AkronLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`akron-logo ${className}`} aria-hidden="true">
      <span className="akron-logo__symbol" />
      <span className="akron-logo__name" />
    </span>
  )
}

export function AkronSymbol({ className = '' }: { className?: string }) {
  return <span className={`akron-logo__symbol ${className}`} aria-hidden="true" />
}

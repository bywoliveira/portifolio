const MONTHS = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.']

/** '2025-05-10' -> '10/05/2025' */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

/** '2025-05-10' -> 'mai. 2025' */
export function formatMonthYear(iso: string): string {
  const [y, m] = iso.split('-')
  return `${MONTHS[Number(m) - 1]} ${y}`
}

/** 4 -> '4 h' */
export function formatHours(hours: number): string {
  return `${hours} h`
}

/** 3 -> '03' */
export function pad(n: number): string {
  return String(n).padStart(2, '0')
}

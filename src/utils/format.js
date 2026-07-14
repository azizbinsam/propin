export function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercent(value) {
  return `${value.toFixed(2).replace('.', ',')}%`
}

export function formatNumber(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}
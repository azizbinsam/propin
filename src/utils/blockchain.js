export function generateTxHash() {
  const hex = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
  return `0x${hex.slice(0, 4)}...${hex.slice(-4)}`
}

export function generateTokenId(propertyId) {
  const codeSource = propertyId.replace(/[^a-z]/gi, '').toUpperCase()
  const code = codeSource.slice(0, 4).padEnd(4, 'X')
  let seed = 0
  for (let i = 0; i < propertyId.length; i++) seed += propertyId.charCodeAt(i)
  const serial = String((seed * 7) % 9000 + 1000)
  return `PRPN-${code}-${serial}`
}
export function generateTxHash() {
  const hex = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
  return `0x${hex.slice(0, 4)}...${hex.slice(-4)}`
}
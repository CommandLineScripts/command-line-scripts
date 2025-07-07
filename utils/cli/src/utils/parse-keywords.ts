export const parseKeywords = (input: string): string[] => {
  if (!input) return []
  return input
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0)
}

export function mapWords(obj: Record<string, string>): { word: string; value: string }[] {
  return Object.entries(obj).map(([word, value]) => ({
    word,
    value,
  }))
}
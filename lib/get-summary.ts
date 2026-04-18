export async function getSummary() {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

  const allWords = await Promise.all(
    letters.map(async (l) => {
      const data = await import(`@/data/${l}.json`)

      return Object.entries(data.default).flatMap(([letter, v]) => ({
        letter,
        count: Object.keys(v as Record<string, string>).length,
      }))
    })
  )

  return allWords.flat()
}
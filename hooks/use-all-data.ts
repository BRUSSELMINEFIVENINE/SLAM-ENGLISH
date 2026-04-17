import data from '../data.json'

const entries = Object.entries(data)

export function useAllData() {
    const allData = entries.map(([l, v]) => ({
      letter: l,
      count: Object.keys(v).length,
    }))

    return {
      allData,
    }
  
}
import { api } from '../api';

export const wordsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWordByLetter: builder.query<Array<{ word: string; value: string }>, { letter: string, shuffle: boolean }>({
      query: ({ letter, shuffle }) => ({
        url: `/words/${letter}`,
        params: { shuffle },
        method: 'GET'
      }),
      providesTags: [{ type: 'Words', id: 'LIST' }]
    }),
    summary: builder.query({
      query: () => ({
        url: '/words/summary',
        method: 'GET',
      }),
      providesTags: [{ type: 'Words', id: 'LIST' }]
    })
  })
})

export const {
  useGetWordByLetterQuery,
  useSummaryQuery,
} = wordsApi
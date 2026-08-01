import { api } from '../api';
import { WordResponse } from './words.interface';

export const wordsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWords: builder.query<{ items: Array<WordResponse>, page: number, limit: number, total: number }, { letter?: string, page?: number, limit?: number, shuffle?: boolean }>({
      query: ({ letter, page = 1, limit = 20, shuffle = false }) => ({
        url: `/words`,
        params: {
          letter,
          page,
          limit,
          shuffle,
        },
        method: 'GET',
      }),
      providesTags: [{ type: 'Words', id: 'LIST' }]
    }),
  })
})

export const {
  useGetWordsQuery,
} = wordsApi
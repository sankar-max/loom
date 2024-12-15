import { useEffect, useState } from 'react'
import { UseLoomQuery } from './useLoomQuery'
import { getSearchWorkspace } from '@/app/dashboard/[workspaceId]/_actions/getSearchWorkspace'

type UseSearchProps = {
  query: string
}
export type UseSearchReturnType = Awaited<ReturnType<typeof getSearchWorkspace>>
export const useSearch = ({ query }: UseSearchProps) => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [data, setData] = useState<UseSearchReturnType['data']>([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [search])

  const { refetch, isLoading, error } = UseLoomQuery({
    queryKey: [query],
    queryFn: async () => {
      const response = await getSearchWorkspace(debouncedSearch)
      return setData(response.data)
    },
  })
  useEffect(() => {
    if (debouncedSearch) refetch()
    if (!debouncedSearch) setData([])
    return () => {
      setData([])
    }
  }, [debouncedSearch, refetch])

  return { data, refetch, isLoading, error, handleSearch, search }
}

import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

type Props<T> = {
 queryKey: QueryKey
 queryFn: QueryFunction<T>
 options?: UseQueryOptions<T>
}
export const UseLoomQuery = <T,>({ queryKey, queryFn, options }: Props<T>) => {

 const query = useQuery<T>({
  queryKey,
  queryFn,
  ...options
 })

 return query
}

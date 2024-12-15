import {
  MutationFunction,
  MutationKey,
  useQueryClient,
  useMutation as useReactQueryMutation,
} from '@tanstack/react-query'
import { toast } from 'sonner'

type Args = {
  queryKey: string
  mutationKey: MutationKey
  mutationFn: MutationFunction<{status:number,data:string}, unknown>
  onSuccess: (data: unknown) => void
}
export const useMutationData = ({
  queryKey,
  mutationKey,
  mutationFn,
  onSuccess,
}: Args) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useReactQueryMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      if (onSuccess) onSuccess(data)
      return toast(data?.status === 200 ? 'success' : 'error', {
        description: data?.data,
      })
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })
  return { mutate, isPending }
}

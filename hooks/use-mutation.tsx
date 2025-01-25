import {
  MutationFunction,
  MutationKey,
  useMutationState,
  useQueryClient,
  useMutation as useReactQueryMutation,
} from '@tanstack/react-query'
import { toast } from 'sonner'

type Args = {
  queryKey: string
  mutationKey: MutationKey
  mutationFn: MutationFunction<{ status: number; data: unknown; message: string }, unknown>
  onSuccess?: (data: unknown) => void
}
export const useMutationData = ({
  queryKey,
  mutationKey,
  mutationFn,
  onSuccess,
}: Args) => {
  const queryClient = useQueryClient()
  const { mutate, isPending,...rest } = useReactQueryMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      debugger
      if (onSuccess) onSuccess(data)
      return toast(data?.status === 200 ? 'success' : 'error', {
        description: data?.message,
      })
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })
  return { mutate, isPending, ...rest }
}

export const useOptimisticMutation = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables,
        status: mutation.state.status,
      }
    },
  })
  const optimisticData = data[data.length - 1]
  return { optimisticData }
}

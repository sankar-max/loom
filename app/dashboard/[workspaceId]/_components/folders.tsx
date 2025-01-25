'use client'
import { UseLoomQuery } from '@/hooks/useLoomQuery'
import { getWorkspaceFolder, GetWorkspaceFolderReturnType } from '../_actions/getWorkspaceFolder'
import { Folder } from './folder'
import { useOptimisticMutation } from '@/hooks/use-mutation'
import { Skeleton } from '@/components/ui/skeleton'
type Props = {
  workspaceId: string
}
export const Folders = ({ workspaceId }: Props) => {
  const { data, isLoading } = UseLoomQuery({
    queryKey: ['workspace-folder'],
    queryFn: () => getWorkspaceFolder(workspaceId),
  })

  const { data: FolderData } = data || {}
  const { optimisticData } = useOptimisticMutation(['create-folder'])
  return (
    <div className="grid grid-cols-2  transition-all duration-300 ease-in-out md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  ">
      {FolderData?.map((folder) => {
        return <Folder key={folder.id} folder={folder} />
      })}

      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex justify-center items-center">
            <Skeleton className="w-full h-14" />
          </div>
        ))}

      {optimisticData?.status === 'pending' && (
        <Folder
          folder={optimisticData.variables as GetWorkspaceFolderReturnType['data'][number]}
          optimistic
        />
      )}
    </div>
  )
}

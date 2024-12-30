import { Input } from '@/components/ui/input'
import { GetWorkspaceFolderReturnType } from '../_actions/getWorkspaceFolder'
import { FolderIcon, Trash, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useMutationData } from '@/hooks/use-mutation'
import { deleteFolder, renameFolder } from '../_actions/createNewFolder'
type Props = {
  folder: GetWorkspaceFolderReturnType['data'][number]
  optimistic?: boolean
}
export const Folder = ({ folder, optimistic = false }: Props) => {
  const [rename, setRename] = useState(false)
  const [renameValue, setRenameValue] = useState(folder.name)
  const { mutate, isPending } = useMutationData({
    mutationKey: ['rename-folder'],
    queryKey: 'workspace-folder',
    mutationFn: ({ name, folderId }: { name: string; folderId: string }) =>
      renameFolder({
        name: renameValue,
        folderId: folder.id,
      }),
  })
  const {
    mutate: deleteMutate,
    isPending: deletePending,
    isIdle,
  } = useMutationData({
    mutationKey: ['delete-folder'],
    queryKey: 'workspace-folder',
    mutationFn: ({ folderId }: { folderId: string }) =>
      deleteFolder({ folderId }),
  })

  console.log('folder delete', deletePending)
  const handleRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(e.target.value)
  }

  const onBlur = () => {
    if (renameValue !== folder.name) {
      mutate({
        name: renameValue,
        folderId: folder.id,
      })
    }
    setRename(false)
  }

  const handleDelete = () => {
    deleteMutate({ folderId: folder.id })
  }
  return (
    <div
      className={cn(
        'flex flex-col h-14 relative border rounded-sm p-2',
        deletePending && 'animate-pop-in ',
        optimistic && 'animate-pop-out'
      )}
    >
      <div className="flex items-center justify-between gap-5">
        <Input
          onClick={() => setRename(true)}
          className={cn(
            ' text-xs line-clamp-1 h-3 p-1 outline-none focus:ring-0 border-none rounded-sm text-ellipsis ',
            rename ? '' : ' outline-none focus:ring-0',
            isPending && 'animate-pulse'
          )}
          onChange={handleRename}
          onBlur={onBlur}
          value={renameValue}
        />
        <div className="flex items-center gap-2">
          <button
            disabled={deletePending || optimistic}
            onClick={handleDelete}
            className="w-4 h-4 shrink-0"
          >
            <Trash2Icon className="w-4 disabled:opacity-50 h-4 shrink-0" />
          </button>
          <FolderIcon className="w-4 h-4 shrink-0" />
        </div>
      </div>
      <p className="text-xs pt-1 text-loom-secondary">
        {folder?._count?.videos || 0} videos
      </p>
    </div>
  )
}

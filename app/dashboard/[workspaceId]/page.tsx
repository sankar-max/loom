'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FolderPlus, Trash2Icon } from 'lucide-react'
import { useMutationData } from '@/hooks/use-mutation'
import { createNewFolder, deleteFolder } from './_actions/createNewFolder'
import { useParams } from 'next/navigation'
import { Folders } from './_components/folders'
import { UseLoomQuery } from '@/hooks/useLoomQuery'
import { getWorkspaceFolder } from './_actions/getWorkspaceFolder'
export default function Page() {
  const pathname = useParams()
  const workspaceId = pathname.workspaceId
  console.log(pathname)

  const { mutate, isPending } = useMutationData({
    queryKey: 'workspace-folder',
    mutationKey: ['create-folder'],
    mutationFn: async () => {
      const response = await createNewFolder({
        name: 'New Folder',
        workspaceId: workspaceId as string,
      })

      return response
    },
  })

  const { data } = UseLoomQuery({
    queryKey: ['workspace-folder'],
    queryFn: () => getWorkspaceFolder(workspaceId as string),
  })
  const { data: FolderData } = data || {}

  const removeAllFolders = FolderData?.map((folder) => folder.id)

  const { mutate: deleteMutate } = useMutationData({
    mutationKey: ['delete-folder'],
    queryKey: 'workspace-folder',
    mutationFn: () => deleteFolder({ folderId: removeAllFolders! }),
  })
  return (
    <div className="flex flex-col mt-4 flex-1">
      <Tabs defaultValue="videos" className="w-full space-y-2">
        <div className="flex justify-between items-center">
          <TabsList className="bg-transparent">
            <TabsTrigger
              className="bg-transparent data-[state=active]:text-white data-[state=active]:bg-muted"
              value="videos"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              className="bg-transparent data-[state=active]:text-white data-[state=active]:bg-muted"
              value="archive"
            >
              Archive
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button
              disabled={isPending}
              onClick={() => {
                deleteMutate({ folderId: removeAllFolders! })
              }}
              className="text-sm"
              variant="outline"
            >
              <Trash2Icon />
            </Button>
            <Button
              disabled={isPending}
              onClick={() =>
                mutate({
                  name: 'New Folder is creating',
                  workspaceId: workspaceId as string,
                })
              }
              className="text-sm"
              variant="secondary"
            >
              <FolderPlus />
              Create new folder
            </Button>
          </div>
        </div>
        <TabsContent value="videos">
          <div className="flex flex-col flex-1">
            <Folders workspaceId={workspaceId as string} />
          </div>
        </TabsContent>
        <TabsContent value="archive">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col flex-1">
              <h1>Archive</h1>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

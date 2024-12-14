import { getUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import { getWorkspace } from './_actions/getWorkspace'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getWorkspaceFolder } from './_actions/getWorkspaceFolder'
import { getUserVideo } from './_actions/getUserVideo'
import { getUserWorkspace } from './_actions/getUserWorkspace'
import { getUserNotification } from './_actions/getUserNotification'
import { Sidebar } from './_components/sidebar'

type Props = {
  children: React.ReactNode
  params: {
    workspaceId: string
  }
}

export default async function Layout({
  children,
  params: { workspaceId },
}: Props) {
  const { user } = await getUser()

  if (!user?.workspace || !user?.workspace.length) {
    return redirect('/auth/sign-in')
  }

  const verifyWorkspace = await getWorkspace(workspaceId)

  if (verifyWorkspace.status !== 200) {
    redirect(`/dashboard/${user?.workspace[0].id}`)
  }

  if (!verifyWorkspace.data) {
    return redirect(`/dashboard/${user?.workspace[0].id}`)
  }

  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: ['workspace-folder', workspaceId],
    queryFn: () => getWorkspaceFolder(workspaceId),
  })
  await query.prefetchQuery({
    queryKey: ['user-video', workspaceId],
    queryFn: () => getUserVideo(),
  })
  await query.prefetchQuery({
    queryKey: ['user-workspace', workspaceId],
    queryFn: () => getUserWorkspace(),
  })
  await query.prefetchQuery({
    queryKey: ['user-notification', workspaceId],
    queryFn: () => getUserNotification(),
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen gap-x-2 w-screen">
        <Sidebar activeWorkspaceId={workspaceId} />
        {children}
      </div>
    </HydrationBoundary>
  )
}

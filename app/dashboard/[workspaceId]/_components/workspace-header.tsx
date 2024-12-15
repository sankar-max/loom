'use client'

import { usePathname } from 'next/navigation'
import { GetWorkspaceReturnType } from '../_actions/getWorkspace'
type Props = {
  workspaceData: GetWorkspaceReturnType['data']
}
export default function WorkspaceHeader({ workspaceData }: Props) {
  const pathname = usePathname()
  const checkWorkspace = pathname.split(`/dashboard/${workspaceData?.id}`)
  console.log('checkWorkspace', checkWorkspace)
  return <div>WorkspaceHeader</div>
}

'use client'

// import { usePathname } from 'next/navigation'
import { GetWorkspaceReturnType } from '../_actions/getWorkspace'
import { cn } from '@/lib/utils'
type Props = {
  workspaceData: GetWorkspaceReturnType['data']
  className?: string
}
export default function WorkspaceHeader({ workspaceData,className }: Props) {
  // const pathname = usePathname()
  //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
  // const _checkWorkspace = pathname.split(`/dashboard/${workspaceData?.id}`)
  return (
    <header className={cn('mt-5 ', className)}>
      <h3 className="text-xs text-loom-secondary">{workspaceData?.type}</h3>
      <h1 className="text-2xl mt-2 font-bold">My library</h1>
    </header>
  )
}


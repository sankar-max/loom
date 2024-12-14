'use server'

import { currentUser } from '@clerk/nextjs/server'
export type GetWorkspaceReturnType = Awaited<ReturnType<typeof getWorkspace>>

export async function getWorkspace(workspaceId: string) {
  try {
    const user = await currentUser()
    if (!user)
      return {
        status: 403 as const,
        message: 'User not authenticated',
        data: null,
      }

    const workspace = await prisma?.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: { clerkId: user.id },
            members: {
              every: { User: { clerkId: user.id } },
            },
          },
        ],
      },
    })

    return { status: 200, data: workspace, message: 'Workspace found' }
  } catch (error) {
    console.error(error)
    return {
      status: 403 as const,
      data: null,
      message: 'User not authenticated',
    }
  }
}

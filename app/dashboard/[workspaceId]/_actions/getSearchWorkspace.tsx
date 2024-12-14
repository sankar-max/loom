'use server'

import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export const getSearchWorkspace = async (query: string) => {
  const user = await currentUser()
  if (!user)
    return { status: 404 as const, data: [], message: 'User not found' }
  try {
    const workspace = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
        NOT: [
          {
            clerkId: user.id,
          },
        ],
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        firstName: true,
        lastName: true,
        email: true,
        image: true,
      },
    })
    if (workspace.length <= 0) {
      return { status: 404 as const, data: [], message: 'Workspace not found' }
    }

    return { status: 200 as const, data: workspace, message: 'Workspace found' }
  } catch (error) {
    console.log(error)
    return { status: 500 as const, data: [], message: 'Internal server error' }
  }
}

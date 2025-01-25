'use server'

import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export type CreateNewFolderReturnType = Awaited<
  ReturnType<typeof createNewFolder>
>

export const createNewFolder = async ({
  name,
  workspaceId,
}: {
  name: string
  workspaceId: string
}) => {
  const user = await currentUser()
  if (!user) return { status: 404, message: 'User not found',data:null }

  const getUserSubscription = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      subscription: {
        select: {
          plan: true,
        },
      },
    },
  })
  const userSubscription = getUserSubscription?.subscription?.plan || 'free'
  if (userSubscription === 'free')
    return { status: 404, message: 'You are not allowed to create a folder' ,data:null}
  const createFolder = await prisma.workSpace.update({
    where: {
      id: workspaceId,
    },
    data: {
      folders: {
        create: { name },
      },
    },
  })
  return {
    status: 200,
    data: createFolder,
    message: 'Folder created successfully',
  }
}

export const renameFolder = async ({
  name,
  folderId,
}: {
  name: string
  folderId: string
}) => {
  if (!name) return { status: 404, message: 'Name is required',data:null }
  if (folderId === '') return { status: 404, message: 'Folder id is required',data:null }

  const updateFolder = await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      name,
    },
  })

  return {
    status: 200,
    data: updateFolder,
    message: 'Folder renamed successfully',
  }
}
export const deleteFolder = async ({
  folderId,
}: {
  folderId: string | string[]
}) => {
    if (!folderId) return { status: 404, message: 'Folder id is required',data:null }

  let deleteFolder
  if (!Array.isArray(folderId)) {
     deleteFolder = await prisma.folder.delete({
      where: {
        id: folderId,
      },
    })
  } else {
     deleteFolder = await prisma.folder.deleteMany({
      where: {
        id: {
          in: folderId
        },
      },
    })
  }

  return {
    status: 200,
    data: deleteFolder,
    message: 'Folder deleted successfully',
  }
}

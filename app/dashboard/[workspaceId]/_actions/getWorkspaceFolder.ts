"use server"

import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
export type GetWorkspaceFolderReturnType = Awaited<ReturnType<typeof getWorkspaceFolder>>;

 export const getWorkspaceFolder = async (workSpaceId: string) => {
 try {
  const user = await currentUser()
  if (!user) return { status: 404 as const , data: [], message: "User not found" }
  const workspaceFolder = await prisma.folder.findMany({
   where: {
    workSpaceId
   },
   include: {
    _count: {
     select: {
      videos: true
     }
    }
   }

  })
  if (!workspaceFolder) return { status: 404, data: [], message: "Folder not found" }
  return { status: 200, data: workspaceFolder, message: "Folder found" }
 }
 catch (error) {
  console.log(error)
  return { status: 403 as const, data: [], message: "Error fetching folder" }
 }

}
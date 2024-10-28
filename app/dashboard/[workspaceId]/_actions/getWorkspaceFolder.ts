"use server"

import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"


 export const getWorkspaceFolder = async (workSpaceId: string) => {
 try {
  const user = await currentUser()
  if (!user) return { status: 404, data: [], message: "User not found" }
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
  return { status: 403, data: [], message: "Error fetching folder" }
 }

}
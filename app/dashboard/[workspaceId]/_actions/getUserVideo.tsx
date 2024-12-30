"use server"

import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
export type GetUserVideoReturnType = Awaited<ReturnType<typeof getUserVideo>>;
export const getUserVideo = async () => {
 try {
  const user = await currentUser()
  if (!user) {
   return { status: 404, data: [], message: "User not found" }
  }

  const userVideo = await prisma.video.findMany({
   where: {
    OR: [
     { workSpaceId: user.id },
     { folderId: user.id },
     { workSpaceId: user.id }
    ]
   },
   select: {
    id: true,
    title: true,
    source: true,
    createdAt: true,
    processing: true,
    Folder: {
     select: {
      name: true,
      id: true
     }
    },
    User: {
     select: {
      id: true,
      firstName: true,
      lastName: true,
      image: true
     }
    }
   },
   orderBy: {
    createdAt: "desc"
   }
  })

  if (!userVideo) {
   return { status: 404, data: [], message: "Video not found" }
  }

  return { status: 200, data: userVideo, message: "Video found" }
 } catch (error) {
  console.log(error)
  return { status: 403, data: [], message: "Error fetching video" }
 }
}
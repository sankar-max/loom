"use server"
export type GetUserWorkspaceReturnType = Awaited<ReturnType<typeof getUserWorkspace>>;

import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export const getUserWorkspace = async () => {
 try {
  const user = await currentUser()
  if (!user) return { status: 404 as const, data: [], message: "User not found" }
  const userWorkspace = await prisma.user.findUnique({
   where: {
    clerkId: user.id
   },
   select: {
    subscription: {
     select: {
      plan: true
     }
    },
    workspace: {
     select: {
      id: true,
      name: true,
      type: true
     }
    },
    members: {
     select: {
      WorkSpace: {
       select: {
        id: true,
        name: true,
        type: true
       }
      }
     }
    }
   }
  })
  if (!userWorkspace) return { status: 404 as const, data: [], message: "Workspace not found" }
  return { status: 200 as const, data: userWorkspace, message: "Workspace found" }
 } catch (error) {
  console.error(error)
  return { status: 403 as const, data: [], message: "Error fetching workspace" }
 }
}
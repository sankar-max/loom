"use server"

import { currentUser } from "@clerk/nextjs/server"

export async function getWorkspace(workspaceId: string) {
 try {
  const user = await currentUser()
  if (!user) return { status: 403, message: "User not authenticated" ,data:null,}

  const workspace = await prisma?.workSpace.findUnique({
   where: {
    id: workspaceId,
    OR: [
     {
      User: { clerkId: user.id },
      members: {
       every: { User: { clerkId: user.id } }
      }
     }
    ]
   }
  })

  return { status: 200, data: workspace, message: "Workspace found" }
 } catch (error) {
  return {
   status: 403, data: 
    null,
   message: "User not authenticated"
  } 
 }
}

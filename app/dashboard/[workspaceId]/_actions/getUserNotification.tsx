"use server"

import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export const getUserNotification = async () => {
 try {
  const user = await currentUser()
  if (!user) return { status: 404, data: [], message: "User not found" }

  const userNotification = await prisma.user.findUnique({
   where: {
    clerkId: user.id
   },
   select: {
    notification: true,
    _count: {
     select: {
      notification: true
     }
    }
   }
  })

  if (!userNotification || userNotification.notification.length > 0) {
   return { status: 404, data: [], message: "Notification not found" }
  }

  return { status: 200, data: userNotification, message: "Notification found" }
 } catch (error) {
  return { status: 403, data: [], message: "Error fetching notification" }
 }
}
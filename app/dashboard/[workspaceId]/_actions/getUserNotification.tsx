"use server"

import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
export type GetUserNotificationReturnType = Awaited<ReturnType<typeof getUserNotification>>;
export const getUserNotification = async () => {
 try {
  const user = await currentUser()
  if (!user) return { status: 404 as const, data: [], message: "User not found" }

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
   return { status: 404 as const, data: [], message: "Notification not found" }
  }

  return { status: 200 as const, data: userNotification, message: "Notification found" }
 } catch (error) {
  console.log(error)
  return { status: 403 as const, data: [], message: "Error fetching notification" }
 }
}
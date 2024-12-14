'use server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from './../lib/prisma'

export const getUser = async () => {
  try {
    const user = await currentUser()
    if (!user) return { status: 403, message: 'User not found' }

    const userExist = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workspace: true,
      },
    })

    if (userExist) return { status: 200, user: userExist }

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },

        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: 'PERSONAL',
          },
        },
      },
      include: {
        workspace: true,
      },
    })

    if (newUser) return { status: 201, user: newUser }

    return { status: 400, message: 'Internal server error' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Internal server error' }
  }
}

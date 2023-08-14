import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { CampusValidator } from '@/lib/validators/campus'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = CampusValidator.parse(body)

    // check if campus already exists
    const campusExists = await db.campus.findFirst({
      where: {
        name,
      },
    })

    if (campusExists) {
      return new Response('Campus already exists', { status: 409 })
    }

    // create campus and associate it with the user
    const campus = await db.campus.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    })

    // creator also has to be subscribed
    await db.subscription.create({
      data: {
        userId: session.user.id,
        campusId: campus.id,
      },
    })

    return new Response(campus.name)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create campus', { status: 500 })
  }
}

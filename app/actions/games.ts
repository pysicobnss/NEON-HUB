'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { games } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getGames(category: 'condo' | 'private') {
  return db
    .select()
    .from(games)
    .where(eq(games.category, category))
    .orderBy(desc(games.createdAt))
}

export async function addGame(data: {
  name: string
  imageUrl: string
  gameLink: string
  category: 'condo' | 'private'
}) {
  const userId = await getUserId()
  
  await db.insert(games).values({
    name: data.name,
    imageUrl: data.imageUrl,
    gameLink: data.gameLink,
    category: data.category,
    userId,
  })
  
  revalidatePath(data.category === 'condo' ? '/games-condo' : '/servidor-privado')
}

export async function updateGame(
  id: number,
  data: {
    name: string
    imageUrl: string
    gameLink: string
  }
) {
  const userId = await getUserId()
  
  await db
    .update(games)
    .set({
      name: data.name,
      imageUrl: data.imageUrl,
      gameLink: data.gameLink,
      updatedAt: new Date(),
    })
    .where(and(eq(games.id, id), eq(games.userId, userId)))
  
  revalidatePath('/games-condo')
  revalidatePath('/servidor-privado')
}

export async function deleteGame(id: number) {
  const userId = await getUserId()
  
  await db.delete(games).where(and(eq(games.id, id), eq(games.userId, userId)))
  
  revalidatePath('/games-condo')
  revalidatePath('/servidor-privado')
}

export async function isAuthenticated() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    return !!session?.user
  } catch {
    return false
  }
}

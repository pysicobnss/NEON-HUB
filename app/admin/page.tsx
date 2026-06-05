import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { AdminDashboard } from '@/components/admin-dashboard'
import { getGames } from '@/app/actions/games'

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  const condoGames = await getGames('condo')
  const privateGames = await getGames('private')

  return (
    <AdminDashboard 
      user={session.user} 
      condoGames={condoGames}
      privateGames={privateGames}
    />
  )
}

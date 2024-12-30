import { getUser } from '@/actions/user'
import { redirect } from 'next/navigation'

export default async function AuthCallback() {
  const { status, user } = await getUser()
  if(user)
  if (status === 403 || status === 500) return redirect('/auth/sign-in')

  if (status === 201 || status === 200)
    return redirect(`/dashboard/${user?.workspace[0]?.id}`)
}


import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user, status } = await getUser();

  if (status === 201 || status === 200) return redirect(`/dashboard/${user?.workspace[0].id}`)

  if (status === 400 || status === 500 || status === 403) return redirect('/auth/sign-in')
}
import { currentUser } from "@clerk/nextjs/server"


export default async function Page() {
  const data = await currentUser()
  console.log(data)
  return <div>


    <img src={data?.imageUrl} alt="user" width={100} height={100} />
  </div>
}

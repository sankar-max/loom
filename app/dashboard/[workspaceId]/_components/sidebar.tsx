'use client'

import { UseLoomQuery } from '@/hooks/useLoomQuery'
import {
  getUserWorkspace,
  GetUserWorkspaceReturnType,
} from '../_actions/getUserWorkspace'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { PanelLeft } from 'lucide-react'
import SidebarItems from './sidebarItems'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { InviteUserModal } from './invite-user.modal'
// import { useMutationData } from '@/hooks/use-mutation'

type Props = {
  activeWorkspaceId: string
}

export const Sidebar = ({ activeWorkspaceId }: Props) => {
  const { data } = UseLoomQuery<GetUserWorkspaceReturnType>({
    queryKey: ['workspace'],
    queryFn: () => getUserWorkspace(),
  })



  // const {mutate:inviteUser} = useMutationData({
  //   mutationKey:['invite-user'],
  //   mutationFn: (data: {receiverId:string,email:string}) => inviteUser(data),
  //   onSuccess: () => {
  //     toast
  //   }
  // })
  const workspacesData = data?.status === 200 ? data.data : null

  return (
    <div className="bg-[#111111] lg:flex hidden group flex-none relative p-4 h-full w-[250px]  flex-col gap-10 overflow-y-auto ">
      {/* logo */}
      <div className="flex text-2xl sticky top-0 bg-[#111111] z-10 items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image src={'/logo.svg'} alt="" width={35} height={35} />
          Loom
        </div>
        <Button
          variant={'ghost'}
          className="px-2.5 py-1 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300"
        >
          <PanelLeft className=" cursor-pointer " />
        </Button>
      </div>
      {/* workspace selector */}
      <div className="">
        <Select defaultValue={activeWorkspaceId}>
          <SelectTrigger className="border py-6 rounded-t-md rounded-b-none">
            <SelectValue placeholder="Select a workspace"></SelectValue>
          </SelectTrigger>
          <SelectContent className="p-0 w-fit h-full">
            {workspacesData?.workspace.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}
            {(workspacesData?.members?.length || 0) > 0 &&
              workspacesData?.members.map(
                (member) =>
                  member && (
                    <SelectItem
                      value={member.WorkSpace?.id as string}
                      key={member.WorkSpace?.id}
                    >
                      {' '}
                      {member?.WorkSpace?.name}
                    </SelectItem>
                  )
              )}
          </SelectContent>
        </Select>
        <InviteUserModal />
      </div>
      <Separator />

      {/* sidebar items */}
      <SidebarItems workspaceId={activeWorkspaceId} />

      <Separator />

      {/* upgrade plan */}
      <Card className="w-full bg-neutral-900 border">
        <CardHeader>
          <CardTitle className="text-white">Upgrade to Pro</CardTitle>
          <CardDescription>
            Upgrade to Loom Pro to get unlimited videos, custom domains, and
            more.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full">
          <Button className="w-full">Upgrade</Button>
        </CardContent>
      </Card>
    </div>
  )
}

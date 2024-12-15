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
import Modal from './modal'
import { PanelLeft, UserRoundPlus } from 'lucide-react'
import { useSearch } from '@/hooks/use-search'
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
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
// import { useMutationData } from '@/hooks/use-mutation'

type Props = {
  activeWorkspaceId: string
}

export const Sidebar = ({ activeWorkspaceId }: Props) => {
  const { data } = UseLoomQuery<GetUserWorkspaceReturnType>({
    queryKey: ['workspace'],
    queryFn: () => getUserWorkspace(),
  })

  const {
    data: userData,
    handleSearch,
    search,
    isLoading,
  } = useSearch({
    query: 'get-user',
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
    <div className="bg-[#111111] group flex-none relative p-4 h-full w-[250px] flex flex-col gap-10 overflow-hidden ">
      {/* logo */}
      <div className="flex text-2xl  items-center justify-between gap-2">
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
        <Modal
          title="Invite people"
          trigger={
            <div className="flex w-full  border border-t-0  rounded-b-md text-sm p-3  gap-2.5 ">
              <UserRoundPlus className="size-4" />
              invite people
            </div>
          }
          description="Invite people to your workspace"
        >
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
          <div className="flex flex-col gap-2 pt-3">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Skeleton className="w-full h-10" />
              </div>
            ) : userData?.length > 0 ? (
              <div className="flex flex-col h-[150px] overflow-y-auto  gap-2">
                {userData?.map((item) => (
                  <div
                    key={item?.email}
                    className="flex cursor-pointer p-1 rounded-md hover:bg-neutral-800 items-center gap-2 w-full"
                  >
                    <Image
                      src={item.image || ''}
                      alt={item.firstName || ''}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    {item?.firstName}

                    <span className="text-sm p-1 text-black bg-white rounded-full  ">
                      {item.subscription?.plan}
                    </span>
                  </div>
                ))}
                {userData?.map((item) => (
                  <div
                    key={item?.email}
                    className="flex cursor-pointer p-1 rounded-md hover:bg-neutral-800 items-center gap-2 w-full"
                  >
                    <Image
                      src={item.image || ''}
                      alt={item.firstName || ''}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    {item?.firstName}

                    <span className="text-sm p-1 text-black bg-white rounded-full  ">
                      {item.subscription?.plan}
                    </span>
                  </div>
                ))}
                {userData?.map((item) => (
                  <div
                    key={item?.email}
                    className="flex cursor-pointer p-1 rounded-md hover:bg-neutral-800 items-center gap-2 w-full"
                  >
                    <Image
                      src={item.image || ''}
                      alt={item.firstName || ''}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    {item?.firstName}

                    <p className="!text-xs p-1 capitalize text-black bg-white rounded-full  ">
                      {item.subscription?.plan}
                    </p>
                  </div>
                ))}
                {userData?.map((item) => (
                  <div
                    key={item?.email}
                    className="flex cursor-pointer p-1 rounded-md hover:bg-neutral-800 items-center gap-2 w-full"
                  >
                    <Image
                      src={item.image || ''}
                      alt={item.firstName || ''}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    {item?.firstName}

                    <span className="text-sm p-1 text-black bg-white rounded-full  ">
                      {item.subscription?.plan}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                No results found
              </div>
            )}
          </div>
        </Modal>
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

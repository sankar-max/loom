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
import {   UserRoundPlus } from 'lucide-react'
import { useSearch } from '@/hooks/use-search'
import SidebarItems from './sidebarItems'

type Props = {
  activeWorkspaceId: string
}

export const Sidebar = ({ activeWorkspaceId }: Props) => {
  const { data } = UseLoomQuery<GetUserWorkspaceReturnType>({
    queryKey: ['workspace'],
    queryFn: () => getUserWorkspace(),
  })

  const {
    data: searchData,
    handleSearch,
    search,
  } = useSearch({
    query: 'workspace',
  })
  const workspacesData = data?.status === 200 ? data.data : null

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-10 overflow-hidden ">
      {/* logo */}
      <div className="flex text-2xl  items-center justify-start gap-2">
        <Image src={'/logo.svg'} alt="" width={35} height={35} />
        Loom
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
          title="Modal Title"
          trigger={
            <div className="flex w-full  border border-t-0  rounded-b-md text-sm p-3  gap-2.5 ">
              <UserRoundPlus className="size-4" />
              invite people
            </div>
          }
          description="Modal Description"
        >
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
          {searchData?.map((item) => (
            <div key={item?.email}>{item?.firstName}</div>
          ))}
        </Modal>
      </div>
      {/* sidebar items */}
      <SidebarItems />
    </div>
  )
}

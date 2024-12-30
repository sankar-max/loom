'use client'

import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { UserRoundPlus } from 'lucide-react'
import { useSearch } from '@/hooks/use-search'
import Modal from './modal'
import Image from 'next/image'

export const InviteUserModal = () => {
  const {
    data: userData,
    handleSearch,
    search,
    isLoading,
  } = useSearch({
    query: 'get-user',
  })
  return (
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
          <div className="flex flex-col max-h-[150px] overflow-y-auto  gap-2">
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

                <p className="text-[8px] p-1 capitalize text-black bg-white rounded-full  ">
                  {item.subscription?.plan}
                </p>
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
  )
}

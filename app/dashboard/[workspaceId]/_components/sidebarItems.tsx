'use client'

import { sidebarItems } from '@/data/sidebar-items'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarItemProps = {
  workspaceId: string
}

const SidebarItems = ({ workspaceId }: SidebarItemProps) => {
  const pathname = usePathname()
  return (
    <ul className="flex flex-col gap-1">
      {sidebarItems(workspaceId).map((item) => (
        <SidebarItem
          isActive={pathname === item.href}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  )
}

export default SidebarItems

const SidebarItem = ({
  item,
  isActive,
}: {
  item: {
    id: number
    name: string
    icon: React.ElementType
    href: string
  }
  isActive: boolean
}) => {
  return (
    <li
      className={cn(
        'flex p-2 transition-all duration-300 ease-in-out text-muted hover:bg-neutral-900 cursor-pointer hover:text-white  items-center text-opacity-45  justify-start text-sm rounded-md gap-2',
        isActive && 'bg-neutral-800 !text-white text-opacity-100'
      )}
    >
      <Link href={item.href} className="flex items-center gap-2">
        <item.icon className="size-5" />
        {item.name}
      </Link>
    </li>
  )
}

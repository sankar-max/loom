'use client'

import { sidebarItems } from '@/data/sidebar-items'
import { cn } from '@/lib/utils'

const SidebarItems = () => {
  return (
    <ul className="flex flex-col gap-1">
      {sidebarItems.map((item, index) => (
        <SidebarItem isActive={index === 0} key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default SidebarItems

const SidebarItem = ({ item, isActive }: { item: (typeof sidebarItems)[number]; isActive: boolean }) => {
  return (
    <li className={cn("flex p-2 transition-all duration-300 ease-in-out hover:bg-neutral-700 cursor-pointer   items-center text-opacity-45  justify-start text-sm rounded-md gap-2", isActive && "bg-neutral-800 !text-white text-opacity-100")}>
      <item.icon className="size-5" />
      {item.name}
    </li>
  )
}

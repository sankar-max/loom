import { BellIcon, HomeIcon, LibraryIcon, SettingsIcon } from 'lucide-react'

export const sidebarItems = (workspaceId: string) => [
  {
    id: 1,
    name: 'Home',
    icon: HomeIcon,
    href: `/dashboard/${workspaceId}`,
  },
  {
    id: 2,
    name: 'Library',
    icon: LibraryIcon,
    href: `/dashboard/${workspaceId}/library`,
  },
  {
    id: 3,
    name: 'Notifications',
    icon: BellIcon,
    href: `/dashboard/${workspaceId}/notifications`,
  },
  {
    id: 4,
    name: 'Settings',
    icon: SettingsIcon,
    href: `/dashboard/${workspaceId}/settings`,
  },
]

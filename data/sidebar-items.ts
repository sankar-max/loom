import { BellIcon, HomeIcon, LibraryIcon, SettingsIcon } from 'lucide-react'

export const sidebarItems = [
  {
    id: 1,
    name: 'Home',
    icon: HomeIcon,
    href: '/dashboard',
  },
  {
    id: 2,
    name: 'Library',
    icon: LibraryIcon,
    href: '/dashboard/library',
  },
  {
    id: 3,
    name: 'Notifications',
    icon: BellIcon,
    href: '/dashboard/notifications',
  },
  {
    id: 4,
    name: 'Settings',
    icon: SettingsIcon,
    href: '/dashboard/settings',
  },
]

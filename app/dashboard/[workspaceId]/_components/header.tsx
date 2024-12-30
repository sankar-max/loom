'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { Search, Upload, Video } from 'lucide-react'

export default function Header() {
  return (
    <div className="flex gap-3  items-center w-full justify-between">
      <div className="flex px-2 py-1 flex-1 items-center gap-1 border rounded-lg focus-within:ring-1 focus-within:ring-primary">
        <Search />
        <Input
          placeholder="Search for people, projects, etc."
          className="border-none overflow-hidden line-clamp-1 focus:ring-0 focus-visible:ring-0"
        />
      </div>
      {/* actions */}
      <div className="flex gap-2">
        <Button variant="outline">
          <Upload />
          Upload
        </Button>

        <Button variant="outline">
          <Video />
          Video
        </Button>
      </div>

      {/* User Profile */}
      <UserButton />
    </div>
  )
}

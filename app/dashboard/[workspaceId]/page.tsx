'use client'

import {
  Tab,
  TabGroup,
  TabList,
  TabProvider,
  TabStyle,
} from '@/components/tab'
import { navbarTab } from '@/data/navbar-tab'
import { LucideIcon } from 'lucide-react'
import { useState } from 'react'

export default function Page() {
  return (
    <div>
      <Tabs tabs={navbarTab} />
    </div>
  )
}

type TabsProps = {
  tabs: {
    name: string
    icon: LucideIcon
  }[]
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('')
  console.log(activeTab)
  return (
    <div className="">
      <Tab className="flex gap-2 relative">
        <TabProvider>
          <TabGroup>
            {tabs.map((tab, index) => (
              <TabList
                active={activeTab === tab.name}
                index={index}
                handleChange={() => setActiveTab(tab.name)}
                key={tab.name}
              >
                <tab.icon className="size-4 fill-loom-primary" />
                <span>{tab.name}</span>
              </TabList>
            ))}
          </TabGroup>

          <TabStyle  className="bg-[#201E43]" />
        </TabProvider>
      </Tab>
    {activeTab === 'home' && <h1 className=''>home</h1>}
    </div>
  )
}

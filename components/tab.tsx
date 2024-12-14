import { cn } from '@/lib/utils'
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
} from 'react'

type TabContextType = {
  activeTab: number
  setActiveTab: (index: number) => void
  activeTabStyle: { left: number; width: number }
  tabRefs: React.MutableRefObject<(HTMLLIElement | null)[]>
}

const TabContext = createContext<TabContextType | undefined>(undefined)

const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeTabStyle, setActiveTabStyle] = useState({ left: 0, width: 0 })

  const tabRefs = useRef<(HTMLLIElement | null)[]>([])

  const updateActiveTabStyle = (ind: number) => {
    const tab = tabRefs.current[ind]!
    if (tab) {
      const { offsetLeft, offsetWidth } = tab
      setActiveTabStyle({ left: offsetLeft, width: offsetWidth })
    }
  }

  useEffect(() => {
    updateActiveTabStyle(activeTab)
  }, [activeTab])

  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab, activeTabStyle, tabRefs }}
    >
      {children}
    </TabContext.Provider>
  )
}

const Tab = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ children, className }, ref) => {
    return (
      <div className={cn('flex relative', className)} ref={ref}>
        {children}
      </div>
    )
  }
)

const TabStyle = forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { activeTab?: boolean }
>(({ className, style },ref) => {
  const { activeTabStyle } = useTab()
  return (
    <div
      ref={ref}
      className={cn(
        'absolute bottom-0 h-full rounded-md bg-neutral-800 transition-all duration-300',
        className
      )}
      style={{
        width: activeTabStyle?.width,
        left: activeTabStyle?.left,
        ...style,
      }}
    />
  )
})


TabStyle.displayName = 'TabStyle'

Tab.displayName = 'Tab'

const TabGroup = forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ children, className }, ref) => {
    return (
      <ul className={cn('flex gap-x-2 px-2', className)} ref={ref}>
        {children}
      </ul>
    )
  }
)

TabGroup.displayName = 'TabGroup'

const TabList = forwardRef<
  HTMLUListElement,
  React.ComponentProps<'li'> & {
    index: number
    handleChange?: () => void
    active?: boolean
  }
>(({ children, className, index, handleChange, active }) => {
  const { setActiveTab, tabRefs } = useTab()

  return (
    <li
      className={cn(
        'flex p-2 rounded-sm z-10 cursor-pointer hover: items-center gap-x-2',
        active && 'text-white',
        className
      )}
      onClick={() => {
        setActiveTab(index)
        if (handleChange) handleChange()
      }}
      ref={(el) => {
        if (el) {
          tabRefs.current[index] = el
        }
      }}
    >
      {children}
    </li>
  )
})

TabList.displayName = 'TabList'

const useTab = () => {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTabs must be used within a TabProvider')
  }
  return context
}

export { Tab, TabProvider, useTab, TabList, TabGroup, TabStyle }

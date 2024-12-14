import * as React from 'react'
import { navigationLinks } from '../data/navigationData'
import Link from 'next/link'
import Image from 'next/image'

export const Navigation: React.FC = () => {
  return (
    <nav className="flex flex-col justify-center px-16 w-full bg-white max-w-[1440px] min-h-[72px] max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">


        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Company Logo"
            width={84}
            height={40}
          />
        </Link>
        <div className="flex justify-center items-center self-stretch my-auto w-20 min-h-[40px]">
          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1dafc18168ac653eedc6bb13e103a592cb3d0c955c8c7208d9693a7146557d2?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e"
            alt="Company Logo"
            className="object-contain self-stretch my-auto aspect-[2.33] w-[84px]"
          /> */}


        </div>
        <div className="flex flex-wrap gap-8 justify-center items-center self-stretch my-auto text-base min-w-[240px] max-md:max-w-full">
          <div className="flex gap-8 items-center self-stretch my-auto text-black min-w-[240px]">
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="gap-1 self-stretch my-auto whitespace-nowrap"
              >
                {link.text}
              </a>
            ))}
          </div>
          <div className="flex gap-4 justify-center items-center self-stretch my-auto">
            <button className="gap-2 self-stretch px-5 py-2 my-auto text-black border border-black border-solid">
              Sign Up
            </button>
            <button className="gap-2 self-stretch px-5 py-2 my-auto text-white whitespace-nowrap bg-black border border-black border-solid">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

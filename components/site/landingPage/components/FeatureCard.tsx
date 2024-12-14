import * as React from 'react'
import { FeatureCardProps } from '../types'

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  ctaText,
}) => {
  return (
    <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
      <div className="flex flex-col w-full text-black">
        {/* <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain w-12 aspect-square"
        /> */}
        <div className="mt-6 text-2xl font-bold leading-9">{title}</div>
        <div className="mt-6 text-base leading-6">{description}</div>
      </div>
      <div className="flex flex-col items-start mt-8 w-full text-base text-black">
        <button className="flex overflow-hidden gap-2 justify-center items-center">
          <span className="self-stretch my-auto">{ctaText}</span>
          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cc59fc65142f42773e3131d8a5a5a8d452f8191d61b72aca044880ddbb310ec?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          /> */}
        </button>
      </div>
    </div>
  )
}

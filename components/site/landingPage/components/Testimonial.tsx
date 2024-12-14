import * as React from 'react'
import { TestimonialProps } from '../types'

export const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  company,
  companyLogo,
}) => {
  return (
    <div className="flex overflow-hidden flex-col flex-1 shrink items-start self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
      <div className="flex overflow-hidden gap-1 items-start">
        {/* {[...Array(rating)].map((_, i) => (
                <img
            key={i}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5047c4025c17f40d5b2ee8a240dcea112908686fa8eea863c9fbe08ef60590bd?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e"
            alt=""
            className="object-contain shrink-0 w-5 aspect-[1.05]"
          />
        ))} */}
      </div>
      <div className="self-stretch mt-8 text-2xl font-bold leading-9 text-black max-md:max-w-full">
        {quote}
      </div>
      <div className="flex gap-5 items-center mt-8 text-base text-black">
        <div className="flex flex-col self-stretch my-auto">
          <div className="font-semibold">{author}</div>
          <div>
            {role}, {company}
          </div>
        </div>
        {companyLogo && (
          <>
            <div className="shrink-0 self-stretch my-auto w-0 border border-black border-solid h-[61px]" />
            {/* <img
              loading="lazy"
              src={companyLogo}
              alt={`${company} logo`}
              className="object-contain shrink-0 self-stretch my-auto aspect-[2.5] w-[120px]"
            /> */}
          </>
        )}
      </div>
    </div>
  )
}

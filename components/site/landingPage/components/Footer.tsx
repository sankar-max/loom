import * as React from 'react'
import { footerSections, socialLinks } from '../data/footerData'
import { NewsletterForm } from './NewsletterForm'

export const Footer: React.FC = () => {
  return (
    <footer className="flex overflow-hidden flex-col px-16 py-20 w-full bg-white max-w-full max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start w-full min-h-[248px] max-md:max-w-full">
        <div className="flex flex-col min-w-[240px] w-[500px] max-md:max-w-full">
          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/41b74809bb8b255a4c229cf17881b0735852779ebcc64cb724def014e74c8ae5?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e"
            alt="Company Logo"
            className="object-contain aspect-[2.33] w-[84px]"
          /> */}
          <div className="mt-6 text-base leading-6 text-black max-md:max-w-full">
            Subscribe to our newsletter for the latest updates on features and
            releases.
          </div>
          <NewsletterForm />
        </div>

        <div className="flex flex-wrap flex-1 shrink gap-10 items-start basis-0 min-w-[240px] max-md:max-w-full">
          {footerSections.map((section, index) => (
            <div
              key={index}
              className="flex overflow-hidden flex-col flex-1 shrink basis-0"
            >
              <div className="text-base font-semibold text-black">
                {section.title}
              </div>
              <div className="flex flex-col mt-4 w-full text-sm text-black">
                {section.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="flex-1 shrink py-2 w-full"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col flex-1 shrink basis-0">
            <div className="text-base font-semibold text-black">
              Connect With Us
            </div>
            <div className="flex flex-col mt-4 w-full text-sm text-black whitespace-nowrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex gap-3 items-center py-2 w-full"
                >
                  {/* <img
                    loading="lazy"
                    src={social.icon}
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                  /> */}
                  <span className="self-stretch my-auto">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-20 w-full text-sm max-md:mt-10 max-md:max-w-full">
        <div className="flex w-full bg-black border border-black border-solid min-h-[1px] max-md:max-w-full" />
        <div className="flex flex-wrap gap-10 justify-between items-start mt-8 w-full max-md:max-w-full">
          <div className="text-black">© 2024 Relume. All rights reserved.</div>
          <div className="flex gap-6 items-start text-black min-w-[240px]">
            <a
              href="/privacy"
              className="underline decoration-auto decoration-solid underline-offset-auto"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="underline decoration-auto decoration-solid underline-offset-auto"
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="underline decoration-auto decoration-solid underline-offset-auto"
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

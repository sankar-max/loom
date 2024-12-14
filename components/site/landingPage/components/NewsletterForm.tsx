import * as React from 'react'

export const NewsletterForm: React.FC = () => {
  return (
    <form className="flex flex-col mt-6 w-full max-md:max-w-full">
      <div className="flex flex-wrap gap-4 items-start w-full text-base max-md:max-w-full">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Your email here"
          className="flex-1 shrink gap-2 self-stretch p-3 border border-black border-solid basis-6 min-w-[240px] text-stone-500"
          required
        />
        <button
          type="submit"
          className="gap-2 self-stretch px-6 py-3 text-black whitespace-nowrap border border-black border-solid w-[119px] max-md:px-5"
        >
          Subscribe
        </button>
      </div>
      <p className="mt-3 text-xs text-black max-md:max-w-full">
        By subscribing, you consent to receive updates and agree to our Privacy
        Policy.
      </p>
    </form>
  )
}

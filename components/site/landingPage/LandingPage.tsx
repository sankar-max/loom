import * as React from 'react'
import { Navigation } from './components/Navigation'
import { FeatureCard } from './components/FeatureCard'
import { Testimonial } from './components/Testimonial'
import { Footer } from './components/Footer'
import { features } from './data/featuresData'
import { testimonials } from './data/testimonialsData'



export const LandingPage: React.FC = () => {
  return (
    <div className="flex w-full gap-5 max-md:flex-col">
      <div className="flex flex-col  max-md:ml-0 max-md:w-full">
        <div className="flex overflow-hidden flex-col w-full max-md:mt-10 max-md:max-w-full">
          <Navigation />

          <main>
            <section className="flex overflow-hidden flex-wrap gap-10 items-center px-16 py-28 max-w-full bg-white w-full max-md:px-5 max-md:py-24">
              <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                <div className="flex flex-col w-full text-black max-md:max-w-full">
                  <h1 className="text-6xl font-bold leading-[67px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
                    Capture and Share Videos Instantly with AI
                  </h1>
                  <p className="mt-6 text-lg leading-7 max-md:max-w-full">
                    Experience the future of communication with our innovative
                    web application. Effortlessly record and share personalized
                    videos in real-time, leveraging the power of AI to connect
                    with your prospects like never before.
                  </p>
                </div>
                <div className="flex gap-4 items-start self-start mt-8 text-base">
                  <button className="gap-2 self-stretch px-6 py-3 text-white bg-black border border-black border-solid max-md:px-5">
                    Get Started
                  </button>
                  <button className="gap-2 self-stretch px-6 py-3 text-black border border-black border-solid max-md:px-5">
                    Learn More
                  </button>
                </div>
              </div>
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/30e7c37ae593096118d857c33cc472ae44ad44dd24fedf1e9c488fe4bae83a45?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e"
                alt="Video sharing demonstration"
                className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[0.96] basis-0 min-w-[240px] max-md:max-w-full"
              /> */}
            </section>

            <section className="flex overflow-hidden flex-col px-16 py-28 w-full text-black bg-white max-w-full max-md:px-5 max-md:py-24 max-md:max-w-full">
              <div className="flex flex-wrap gap-10 items-start w-full max-md:max-w-full">
                <h2 className="overflow-hidden flex-1 shrink text-4xl font-bold leading-10 min-w-[240px] max-md:max-w-full">
                  Unlock the Power of Instant Video Sharing with AI-Driven
                  Efficiency
                </h2>
                <p className="overflow-hidden flex-1 shrink text-lg leading-7 min-w-[240px] max-md:max-w-full">
                  Experience unparalleled convenience with our web application,
                  designed to save you time and effort. Effortlessly record and
                  share videos with your prospects, all while leveraging
                  advanced AI enhancements for a seamless experience. Simplify
                  your communication and elevate your outreach with just a few
                  clicks.
                </p>
              </div>
                {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cddc737c4088ddfbce00e38586d1aa1f6d2b77bbba0aad98b3e2021a181ad2d8?placeholderIfAbsent=true&apiKey=a0402da45aec46558069faa10175380e"
                alt="AI-powered video sharing platform interface"
                className="object-contain mt-20 w-full aspect-[1.78] max-md:mt-10 max-md:max-w-full"
              /> */}
            </section>

            <section className="flex overflow-hidden flex-col px-16 py-28 max-w-full bg-white w-full max-md:px-5 max-md:py-24">
              <h2 className="text-4xl font-bold leading-10 text-black max-md:max-w-full">
                Unlock the Power of Instant Video Recording and Sharing with AI
              </h2>
              <div className="flex flex-wrap gap-10 justify-center items-start mt-20 w-full max-md:mt-10 max-md:max-w-full">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </section>

            <section className="flex overflow-hidden flex-col px-16 py-28 w-full bg-white max-w-full max-md:px-5 max-md:py-24 max-md:max-w-full">
              <div className="flex overflow-hidden gap-8 items-start w-full max-md:max-w-full">
                {testimonials.map((testimonial, index) => (
                  <Testimonial key={index} {...testimonial} />
                ))}
              </div>
            </section>

            <section className="flex overflow-hidden flex-col justify-center px-16 py-28 w-full bg-white max-w-full max-md:px-5 max-md:py-24 max-md:max-w-full">
              <div className="flex overflow-hidden items-center p-16 w-full bg-black border border-black border-solid max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[768px]">
                  <div className="flex flex-col w-full text-white max-md:max-w-full">
                    <h2 className="text-5xl font-bold leading-[58px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
                      Transform Your Communication Today
                    </h2>
                    <p className="mt-6 text-lg max-md:max-w-full">
                      Join us now to revolutionize how you connect with
                      prospects through instant video sharing.
                    </p>
                  </div>
                  <div className="flex gap-4 items-start self-start mt-8 text-base">
                    <button className="gap-2 self-stretch px-6 py-3 text-black bg-white border border-white border-solid max-md:px-5">
                      Sign Up
                    </button>
                    <button className="gap-2 self-stretch px-6 py-3 text-white border border-white border-solid max-md:px-5">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  )
}

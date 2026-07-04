import { FeatureCarousel } from "./feature-carousel"

export function BentoSection() {
  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-8">
        <div className="w-[547px] h-[938px] absolute top-[614px] left-[80px] origin-top-left rotate-[-33.39deg] bg-foreground/10 blur-[130px] z-0" />
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[760px] text-center text-foreground text-4xl md:text-6xl font-medium leading-tight md:leading-[66px]">
              Everything around a real meetup
            </h2>
            <p className="w-full max-w-[660px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Swipe through the SOHABI moments that turn a small hello into coffee, friendship, safe arrivals, and circles that keep meeting.
            </p>
          </div>
        </div>
        <FeatureCarousel />
      </div>
    </section>
  )
}

'use client'

import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import * as React from 'react'

interface CarouselProps {
  options?: EmblaOptionsType
  children: React.ReactNode
}

export function Carousel({ children, options }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev())
      setNextBtnDisabled(!emblaApi.canScrollNext())
    }

    emblaApi.on('init', onSelect)
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('init', onSelect)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">{children}</div>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 space-x-1">
        <button
          title="Scroll Previous"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          title="Scroll Next"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export const CarouselContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-[0_0_100%]">{children}</div>
)

export const CarouselItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-[0_0_auto] min-w-0 pl-4">{children}</div>
)
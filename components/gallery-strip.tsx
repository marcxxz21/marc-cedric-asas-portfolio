"use client";

import { useRef } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { gallery } from "@/lib/portfolio-data";

export function GalleryStrip() {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    scroller.current?.scrollBy({
      left: direction * 312,
      behavior: "smooth"
    });
  }

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="grid auto-cols-[minmax(220px,1fr)] grid-flow-col gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] md:auto-cols-[minmax(260px,0.32fr)]"
      >
        {gallery.map((item, index) => (
          <figure
            className="group animate-quiet-rise overflow-hidden border border-line bg-white"
            key={item.title}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.035]"
                height={540}
                src={item.image}
                width={720}
              />
            </div>
            <figcaption className="border-t border-line px-3 py-2 text-xs font-medium text-muted">
              {item.title}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
        <button
          aria-label="Previous gallery items"
          className="pointer-events-auto -ml-3 inline-flex size-9 items-center justify-center border border-line bg-paper/90 text-ink backdrop-blur transition hover:border-accent hover:text-accent active:-translate-y-px"
          onClick={() => scrollByCard(-1)}
          type="button"
        >
          <CaretLeft size={17} />
        </button>
        <button
          aria-label="Next gallery items"
          className="pointer-events-auto -mr-3 inline-flex size-9 items-center justify-center border border-line bg-paper/90 text-ink backdrop-blur transition hover:border-accent hover:text-accent active:-translate-y-px"
          onClick={() => scrollByCard(1)}
          type="button"
        >
          <CaretRight size={17} />
        </button>
      </div>
    </div>
  );
}

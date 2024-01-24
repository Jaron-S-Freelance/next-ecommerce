import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "@/app/styles/homeCarousel.css";

interface ImageCarouselProp {
  images: string[];
  className?: string;
}

const ImageCarousel = ({ images, className }: ImageCarouselProp) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelectSlide = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className={`embla ${className}`} ref={emblaRef}>
      <div className="embla__container">
        {images.map((image, index) => (
          <div className="embla__slide" key={index}>
            <Image
              className="embla__img"
              src={image}
              alt={`banner ${index}`}
              width={2000}
              height={750}
            />
          </div>
        ))}
      </div>
      <PrevButton onClick={scrollPrev} />
      <NextButton onClick={scrollNext} />
      <IndicatorDots
        slides={images.length}
        selectedIndex={selectedIndex}
        onSelect={onSelectSlide}
      />
    </div>
  );
};

const PrevButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="embla__arrow embla__arrow--prev btn btn-circle"
  >
    <IoChevronBack fontSize="22px" />
  </button>
);

const NextButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="embla__arrow embla__arrow--next btn btn-circle"
  >
    <IoChevronForward fontSize="22px" />
  </button>
);

const IndicatorDots: React.FC<{
  slides: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
}> = ({ slides, selectedIndex, onSelect }) => (
  <div className="embla__dots">
    {Array.from({ length: slides }, (_, index) => (
      <button
        key={index}
        className={`embla__dot ${
          index === selectedIndex ? "embla__dot--active" : ""
        }`}
        onClick={() => onSelect(index)}
      />
    ))}
  </div>
);

export default ImageCarousel;

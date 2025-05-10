import React, { useEffect, useState, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import Zoom from "react-medium-image-zoom";
import "keen-slider/keen-slider.min.css";
import "react-medium-image-zoom/dist/styles.css";

const ResponsiveCarousel = ({ galleryImages = [] }) => {
  const [isClient, setIsClient] = useState(false);
  const [selected, setSelected] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({}); // Track per-image load

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(s) {
      setSelected(s.track.details.rel);
    },
  });

  const [thumbnailRef] = useKeenSlider({
    slides: {
      perView: Math.min(5, galleryImages.length),
      spacing: 10,
    },
    slideChanged(s) {
      if (instanceRef.current) {
        instanceRef.current.moveToIdx(s.track.details.rel);
      }
    },
  });

  useEffect(() => setIsClient(true), []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      setSelected((prev) => {
        if (diff > 0 && prev < galleryImages.length - 1) return prev + 1;
        if (diff < 0 && prev > 0) return prev - 1;
        return prev;
      });
    }
  };

  if (!isClient) {
    return (
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src={galleryImages[0]?.src}
          alt={galleryImages[0]?.alt || "Image"}
          className="w-full object-cover max-h-96"
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Main slider */}
      <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className="keen-slider__slide flex justify-center items-center cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <img
              src={img.src}
              alt={img.alt || `carousel-image-${i}`}
              loading="lazy"
              onLoad={() =>
                setLoadedImages((prev) => ({ ...prev, [img.src]: true }))
              }
              className={`rounded-lg object-cover w-full max-h-[500px] transition duration-300 ease-in-out ${
                loadedImages[img.src] ? "blur-0" : "blur-sm"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div
        ref={thumbnailRef}
        className="keen-slider thumbnail-slider flex gap-2"
      >
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={`keen-slider__slide border-2 ${
              selected === i
                ? "border-blue-500"
                : "border-transparent hover:border-gray-300"
            } cursor-pointer rounded-md overflow-hidden`}
            onClick={() => instanceRef.current?.moveToIdx(i)}
          >
            <img
              src={img.src}
              alt={`thumb-${i}`}
              loading="lazy"
              onLoad={() =>
                setLoadedImages((prev) => ({
                  ...prev,
                  [`thumb-${img.src}`]: true,
                }))
              }
              className={`aspect-[4/3] w-full object-cover transition duration-300 ease-in-out ${
                loadedImages[`thumb-${img.src}`] ? "blur-0" : "blur-sm"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen swipeable + zoomable modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center"
          onClick={() => setIsExpanded(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Zoom>
            <img
              src={galleryImages[selected].src}
              alt="Expanded"
              className="max-w-full max-h-full object-contain rounded"
              loading="lazy"
            />
          </Zoom>
        </div>
      )}
    </div>
  );
};

export default ResponsiveCarousel;

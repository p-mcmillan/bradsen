import React, { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Zoom from "react-medium-image-zoom";

import "keen-slider/keen-slider.min.css";
import "react-medium-image-zoom/dist/styles.css";

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => slide.classList.remove("active"));
    }

    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          mainRef.current?.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const Arrow = ({ left, onClick, disabled }) => (
  <svg
    onClick={onClick}
    className={`absolute top-1/2 z-10 w-10 h-10 p-2 bg-white/80 hover:bg-white text-black rounded-full shadow ${
      left ? "left-2" : "right-2"
    } ${disabled ? "opacity-40 pointer-events-none" : ""}`}
    viewBox="0 0 24 24"
  >
    {left ? (
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    ) : (
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    )}
  </svg>
);

const ResponsiveCarousel = ({ galleryImages = [] }) => {
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loaded, setLoaded] = useState([]);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: { perView: Math.min(5, galleryImages.length), spacing: 10 },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setLoaded((prev) => {
      const updated = [...prev];
      updated[currentSlide] = true;
      return updated;
    });
  }, [currentSlide]);

  if (!isClient) {
    return (
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src={galleryImages[0]?.original}
          alt="Primary"
          className="w-full object-cover max-h-96"
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 relative">
      {/* Main carousel */}
      <div
        ref={sliderRef}
        className="keen-slider relative rounded-lg overflow-hidden"
      >
        {galleryImages.map(({ original }, i) => (
          <div
            key={i}
            className="keen-slider__slide flex justify-center items-center cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <img
              src={loaded[i] ? original : ""}
              alt={`carousel-image-${i}`}
              loading="lazy"
              className={`rounded-lg object-cover w-full max-h-[500px] transition duration-300 ease-in-out ${
                loaded[i] ? "blur-0" : "blur-sm"
              }`}
            />
          </div>
        ))}

        <Arrow
          left
          onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
          disabled={false}
        />
        <Arrow
          onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
          disabled={false}
        />
      </div>

      {/* Thumbnails */}
      <div
        ref={thumbnailRef}
        className="keen-slider thumbnail flex gap-2 overflow-x-auto"
      >
        {galleryImages.map(({ thumbnail }, i) => (
          <div
            key={i}
            className={`keen-slider__slide border rounded overflow-hidden ${
              currentSlide === i ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img
              src={thumbnail}
              alt={`thumb-${i}`}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Zoom modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center"
          onClick={() => setIsExpanded(false)}
        >
          <Zoom>
            <img
              src={galleryImages[currentSlide]?.original}
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

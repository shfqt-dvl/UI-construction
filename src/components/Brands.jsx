
import { useEffect, useRef } from "react";
import "./Brands.css";

const brands = [
  { name: "ACC Cement", logo: "/Brands/acc.png", url: "https://www.acclimited.com/" },
  { name: "Ambuja Cement", logo: "/Brands/ambuja-logo.png", url: "https://www.ambujacement.com/" },
  { name: "Birla Cement", logo: "/Brands/mp-birla-group-logo.png", url: "https://www.mpbirlacement.com/" },
  { name: "JSW Cement", logo: "/Brands/jsw-logo.png", url: "https://www.jswcement.in/" },
  { name: "Mahabir TMT", logo: "/Brands/Mahabir-logo.png", url: "https://www.mahabirtmt.com/" },
  { name: "Vijay TMT", logo: "/Brands/vijay-logo.png", url: "https://www.vijaytmt.com/" },
  { name: "Dr. Fixit", logo: "/Brands/drfixit-logo.png", url: "https://www.drfixit.co.in/" },
  { name: "IDOL Pipes", logo: "/Brands/idol-logo.png", url: "https://www.google.com/search?q=IDOL+Pipes+official+website" },
  { name: "Fevicol", logo: "/Brands/fevi-logo.png", url: "https://www.fevicol.in/" },
  { name: "Asian Paints", logo: "/Brands/asian-logo.png", url: "https://www.asianpaints.com/" },
  { name: "Birla Opus", logo: "/Brands/opus-logo.png", url: "https://www.birlaopus.com/" },
  { name: "Nerolac", logo: "/Brands/Nerolac-Logo.png", url: "https://www.nerolac.com/" },
  { name: "Prince Pipes", logo: "/Brands/prince-logo.png", url: "https://www.princepipes.com/" },
  { name: "CERA", logo: "/Brands/cera-logo.png", url: "https://www.cera-india.com/" },
  { name: "Glocera", logo: "/Brands/golocera-logo.png", url: "https://www.google.com/search?q=Glocera+official+website" },
  { name: "Hindware", logo: "/Brands/hindware-logo.png", url: "https://hindware.com/" },
];

export default function Brands() {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);

  const loopWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const hoverRef = useRef(false);
  const suppressClickRef = useRef(false);
  const clickTimerRef = useRef(null);

  // Three copies create a seamless infinite loop.
  const brandsForSlider = [...brands, ...brands, ...brands];

  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;

    if (!slider || !track) return;

    let frameId;
    let lastTime = 0;
    let running = true;

    const measure = () => {
      const oldWidth = loopWidthRef.current;
      const newWidth = track.scrollWidth / 3;

      if (!newWidth || !Number.isFinite(newWidth)) return;

      loopWidthRef.current = newWidth;

      if (oldWidth === 0) {
        slider.scrollLeft = newWidth;
      } else if (Math.abs(oldWidth - newWidth) > 1 && !draggingRef.current) {
        slider.scrollLeft =
          newWidth + (slider.scrollLeft % oldWidth);
      }
    };

    const keepInLoop = () => {
      const width = loopWidthRef.current;
      if (width <= 0) return;

      if (slider.scrollLeft >= width * 2) {
        slider.scrollLeft -= width;
      } else if (slider.scrollLeft < width) {
        slider.scrollLeft += width;
      }
    };

    const animate = (time) => {
      if (!running) return;

      if (lastTime !== 0 && !hoverRef.current && !draggingRef.current) {
        const delta = Math.min(time - lastTime, 32);
        slider.scrollLeft += (35 * delta) / 1000;
        keepInLoop();
      }

      lastTime = time;
      frameId = requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(slider);

    const images = track.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("load", measure));

    measure();
    frameId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      observer.disconnect();

      images.forEach((img) => img.removeEventListener("load", measure));

      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    hoverRef.current = true;
  };

  const handleMouseLeave = () => {
    hoverRef.current = false;
    draggingRef.current = false;
    sliderRef.current?.classList.remove("is-dragging");
  };

  const handlePointerDown = (event) => {
    // Only start dragging with the primary mouse button.
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const slider = sliderRef.current;
    if (!slider) return;

    draggingRef.current = true;
    movedRef.current = false;
    startXRef.current = event.clientX;
    startScrollRef.current = slider.scrollLeft;

    slider.classList.add("is-dragging");
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const deltaX = event.clientX - startXRef.current;

    if (Math.abs(deltaX) > 6) {
      movedRef.current = true;
    }

    if (movedRef.current) {
      slider.scrollLeft = startScrollRef.current - deltaX;

      const width = loopWidthRef.current;

      if (width > 0) {
        if (slider.scrollLeft >= width * 2) {
          slider.scrollLeft -= width;
          startScrollRef.current -= width;
        } else if (slider.scrollLeft < width) {
          slider.scrollLeft += width;
          startScrollRef.current += width;
        }
      }
    }
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) return;

    draggingRef.current = false;
    sliderRef.current?.classList.remove("is-dragging");

    if (movedRef.current) {
      suppressClickRef.current = true;

      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }

      // Keep the following click suppressed, but reset if no click fires.
      clickTimerRef.current = setTimeout(() => {
        suppressClickRef.current = false;
        movedRef.current = false;
      }, 250);
    }
  };

  const handleClickCapture = (event) => {
    if (suppressClickRef.current && movedRef.current) {
      event.preventDefault();
      event.stopPropagation();

      suppressClickRef.current = false;
      movedRef.current = false;

      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
    }
  };

  return (
    <section className="brands-section" id="brands" data-aos="fade-up">
      <div className="brands-heading">
        <span>OUR TRUSTED PARTNERS</span>
        <h2>Brands We Deal In</h2>
        <p>Quality products from trusted construction brands.</p>
      </div>

      <div
        className="brands-slider"
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
      >
        <div className="brands-track" ref={trackRef}>
          {brandsForSlider.map((brand, index) => (
            <a
              className="brand-item"
              key={`${brand.name}-${index}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              aria-label={`Visit ${brand.name}`}
              onDragStart={(event) => event.preventDefault()}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                draggable={false}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

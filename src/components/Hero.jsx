
import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import "./Hero.css";

const slides = [
  {
    src: "/hero/5-Types-of-Construction-1.webp",
    alt: "Construction site and building materials",
  },
  {
    src: "/hero/construction-worker-truss-installation-1-scaled.jpg",
    alt: "Construction worker installing a truss",
  },
  {
    src: "/hero/blog64_7665e15153.jpg",
    alt: "Building construction project",
  },
  {
    src: "/hero/Vasuki_Does-Cement-Expire_Blog_001_v001_20260317_DP-3.webp",
    alt: "Cement and construction materials",
  },
  {
    src: "/hero/Building-Materials-List-860x484.webp",
    alt: "Building materials",
  },
  {
    src: "/hero/istockphoto-1386874208-612x612.jpg",
    alt: "Construction industry",
  },
];

const allSlides = [...slides, slides[0]];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => {
        if (current >= slides.length) return current;
        return current + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = (event) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "transform"
    ) {
      return;
    }

    if (currentSlide === slides.length) {
      setTransitionEnabled(false);
      setCurrentSlide(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  };

  const showSlide = (index) => {
    setTransitionEnabled(true);
    setCurrentSlide(index);
  };

  return (
    <section className="hero" data-aos="fade" id="home">
      <div className="hero-background">
        <div
          className={`hero-slider-track ${
            transitionEnabled ? "slider-animated" : "slider-reset"
          }`}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${
              currentSlide * (100 / allSlides.length)
            }%)`,
          }}
        >
          {allSlides.map((slide, index) => (
            <div
              className="hero-slide"
              key={`${slide.src}-${index}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-eyebrow">
          YOUR TRUSTED CONSTRUCTION PARTNER
        </span>

        <h1>
          MUSHAD CONSTRUCTION AND
          <span className="display flex">HARDWARE STORE</span>
        </h1>

        <p className="hero-tagline">
          Quality Materials. Reliable Service. Stronger Foundations.
        </p>

        <p className="hero-description">
          From cement and steel to paints, pipes and sanitaryware,
          find dependable materials for every construction project.
        </p>

        <div className="hero-buttons">
          <a href="#products" className="btn btn-primary">
            Explore Products <ArrowRight size={18} />
          </a>

          <a href="#contact" className="btn btn-secondary">
            <Phone size={17} />
            Contact Us
          </a>
        </div>
      </div>

      <div className="hero-slider-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={
              index === currentSlide % slides.length
                ? "hero-slider-dot active"
                : "hero-slider-dot"
            }
            onClick={() => showSlide(index)}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={index === currentSlide % slides.length}
          />
        ))}
      </div>
    </section>
  );
}

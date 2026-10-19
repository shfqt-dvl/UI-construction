
import { useRef, useState } from "react";
import "./About.css";
import {
  BadgeCheck,
  Handshake,
  PackageCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

const strengths = [
  {
    image: "/Brands/trust1.png",
    alt: "Trusted construction brands",
    icon: BadgeCheck,
    title: "Trusted Brands",
    text: "A selection of established brands for your project needs.",
  },
  {
    image: "/Brands/customer1.png",
    alt: "Customer service",
    icon: Handshake,
    title: "Customer First",
    text: "Helpful service when choosing suitable materials.",
  },
  {
    image: "/Brands/wide.png",
    alt: "Construction materials selection",
    icon: PackageCheck,
    title: "Wide Selection",
    text: "Building, painting, plumbing, and hardware essentials.",
  },
];

export default function About() {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("Video could not play:", error);
      }
    } else {
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    
<section
  className="section about-section"
  id="about"
  data-aos="fade-up"
>

      <div className="container about-layout">
        <div className="about-visual">
          <div className="about-image about-video">
            {!videoError ? (
              <>
                <video
                  ref={videoRef}
                  className="about-video-player"
                  src="/Brands/clip.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onVolumeChange={(event) =>
                    setIsMuted(event.currentTarget.muted)
                  }
                  onError={() => setVideoError(true)}
                  aria-label="Construction video. Click to pause or play."
                />

                <div className="about-video-shade" />

                <div className="about-video-caption">
                  <span className="about-video-dot" />
                  <span>Building Better, Together</span>
                </div>

                {/* Sound control: top-right */}

<button
  type="button"
  className="about-sound-control"
  onClick={(event) => {
    event.stopPropagation();
    toggleSound();
  }}
  aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
  title={isMuted ? "Turn sound on" : "Turn sound off"}
>
  {isMuted ? <VolumeX size={21} /> : <Volume2 size={21} />}
</button>


                {/* Pause/play control: bottom-right */}
                <button
                  type="button"
                  className="about-play-control"
                  onClick={(event) => {
                    event.stopPropagation();
                    togglePlay();
                  }}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  title={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause size={21} />
                  ) : (
                    <Play size={21} />
                  )}
                </button>
              </>
            ) : (
              <div className="about-video-fallback">
                <PackageCheck size={54} />
                <strong>Building Better, Together</strong>
                <span>Your construction materials partner</span>
                <small>
                  Check public/Brands/about-clip.mp4
                </small>
              </div>
            )}
          </div>

          <div className="about-highlight">
            <span className="about-highlight-icon">
              <BadgeCheck size={25} />
            </span>
            <div className="about-highlight-text">
              <strong>Your Trusted Construction Partner</strong>
              <p>
                Quality materials, trusted brands and helpful service
                for every project.
              </p>
            </div>
          </div>
        </div>

        <div className="about-copy">
          <span className="eyebrow">ABOUT OUR STORE</span>

          <h2>
            A Reliable Partner for Every <span>Build</span>
          </h2>

          <p>
            At Mushad Construction and Hardware Store, we help
            customers find materials for building, renovation,
            painting, and plumbing work. Our focus is on dependable
            products, trusted brands, and helpful customer service.
          </p>

          <p>
            Whether you are planning a small home improvement or a
            larger construction project, we are here to help you
            explore your options.
          </p>

          <div className="strength-list">
            {strengths.map((item) => {
              const Icon = item.icon;

              return (
                <div className="strength-item" key={item.title}>
                  <span className="strength-icon">
                    <img
                      src={item.image}
                      alt={item.alt}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        event.currentTarget.nextElementSibling?.classList.add(
                          "fallback-visible"
                        );
                      }}
                    />
                    <Icon
                      className="strength-fallback-icon"
                      size={22}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <a className="btn btn-primary" href="#contact">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

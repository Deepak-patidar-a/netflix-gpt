import React, { useState, useRef, useEffect } from "react";

const VideoBackground = ({ movie }) => {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)

  const hasVideo = Boolean(movie?.video)

  // Used state-based width check instead of window.innerWidth
  // so it reacts correctly if user resizes or rotates device
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const shouldDisableVideo =
    !hasVideo ||
    isMobile ||
    navigator.connection?.saveData;

  //Stop after 15s
  useEffect(() => {
    if (shouldDisableVideo) return

    const timer = setTimeout(() => {
      videoRef.current?.pause()
    }, 15000)

    return () => clearTimeout(timer)
  }, [shouldDisableVideo])

  //Pause when out of viewport
  useEffect(() => {
    if (shouldDisableVideo) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause()
        }
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [shouldDisableVideo]);

  if (shouldDisableVideo) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/50 sm:bg-black/40" />

        <div className="absolute top-0 w-full
          h-24 sm:h-32 md:h-40
          bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 w-full
          h-24 sm:h-32 md:h-40
          bg-gradient-to-t from-[#141414] to-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">

      <img
        src={movie.poster}
        alt={movie.title}
        className={`absolute inset-0 w-full h-full object-cover object-top
          transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src={movie.video}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onCanPlay={() => setReady(true)}
        onError={() => setReady(false)}
        className={`absolute inset-0 w-full h-full object-cover
          transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />

      <div className="absolute inset-0 bg-black/50 md:bg-black/40" />

      {/* Top gradient */}
      <div className="absolute top-0 w-full
        h-24 sm:h-32 md:h-40
        bg-gradient-to-b from-black to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 w-full
        h-24 sm:h-32 md:h-40
        bg-gradient-to-t from-[#141414] to-transparent" />
    </div>
  );
};

export default VideoBackground;
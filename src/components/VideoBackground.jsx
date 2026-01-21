import React, { useState, useRef, useEffect } from "react";

const VideoBackground = ({ movie }) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const videoUrl = movie.playbackURLs?.find(
    (v) => v.videoMimeType === "MP4"
  )?.url;

  const fallbackImage = movie.primaryTitle?.primaryImage?.url;

  const shouldDisableVideo =
    window.innerWidth < 768 ||
    navigator.connection?.saveData === true;

  /* ------------------------------
     Intersection Observer
  -------------------------------*/
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* ------------------------------
     Play / Pause video
  -------------------------------*/
  useEffect(() => {
    if (!videoRef.current) return;

    if (isVisible && !shouldDisableVideo) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVisible, shouldDisableVideo]);

  /* ------------------------------
     Stop video after 15s
  -------------------------------*/
  useEffect(() => {
    if (!isVisible || shouldDisableVideo) return;

    const timer = setTimeout(() => {
      videoRef.current?.pause();
    }, 15000);

    return () => clearTimeout(timer);
  }, [isVisible, shouldDisableVideo]);

  /* ------------------------------
     Mobile / Data saver fallback
  -------------------------------*/
  if (shouldDisableVideo) {
    return (
      <img
        src={fallbackImage}
        alt="movie poster"
        className="w-full h-screen object-cover"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Poster */}
      <img
        src={fallbackImage}
        alt="movie poster"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isVideoReady ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
        src={videoUrl}
        muted
        loop
        playsInline
        onCanPlay={() => setIsVideoReady(true)}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* TOP GRADIENT */}
      <div className="absolute top-0 h-40 w-full bg-gradient-to-b from-black to-transparent" />

      {/* BOTTOM GRADIENT */}
      <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-[#141414] to-transparent" />
    </div>
  );
};

export default VideoBackground;

import React, { useState, useRef, useEffect } from "react";

const VideoBackground = ({ movie }) => {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  const hasVideo = Boolean(movie?.video);

  const shouldDisableVideo =
    !hasVideo ||
    window.innerWidth < 768 ||
    navigator.connection?.saveData;

  // ⏸ stop after 15s
  useEffect(() => {
    if (shouldDisableVideo) return;

    const timer = setTimeout(() => {
      videoRef.current?.pause();
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // ⏸ pause when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  if (shouldDisableVideo) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 h-40 w-full bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-[#141414] to-transparent" />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Poster */}
      <img
        src={movie.poster}
        className={`absolute inset-0 w-full h-full object-cover
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
        onError={() => setReady(false)} // ✅ important
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 w-full h-full object-cover
          transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
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

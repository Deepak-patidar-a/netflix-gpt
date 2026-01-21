import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";


const MainContainer = () => {
  const heroMovie = useSelector((store) => store.movies.heroMovie);

  if (!heroMovie) return null;

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-black">
      <VideoBackground movie={heroMovie} />
      <VideoTitle movie={heroMovie} />
      {/* 🔥 THIS GRADIENT (hero → lists fade) */}
      <div
        className="absolute bottom-0 h-40 w-full
        bg-gradient-to-t from-[#141414] to-transparent"
      />
    </div>
  );
};

export default MainContainer;

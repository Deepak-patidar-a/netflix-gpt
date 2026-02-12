import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";


const MainContainer = () => {
  const heroMovie = useSelector((store) => store.movies.heroMovie)

  if (!heroMovie) return null

  return (
    <div className="relative w-full 
      h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] 
      overflow-hidden bg-black">

      <VideoBackground movie={heroMovie} />
      <VideoTitle movie={heroMovie} />

      <div className="absolute bottom-0 w-full
        h-24 sm:h-28 md:h-32 lg:h-40
        bg-gradient-to-t from-[#141414] to-transparent"
      />
    </div>
  )
}

export default MainContainer;
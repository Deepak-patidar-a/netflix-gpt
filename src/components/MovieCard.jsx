import { Play, Plus, ThumbsUp, Check } from "lucide-react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToMyList, removeFromMyList } from "../utils/myListSlice";
import { showToast } from "../utils/toastSlice";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef(null);
  const dispatch = useDispatch();
  const myList = useSelector((store) => store.myList.movies);
  const isInMyList = myList.some((m) => m.id === movie.id);

  if (!movie?.poster) return null

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setIsHovered(true), 180)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current)
    setIsHovered(false)
  }

  const handleTap = (e) => {
    if (e.target.closest("button")) return
    setIsHovered((prev) => !prev)
  }

  const handleAddRemove = (e) => {
    e.stopPropagation()
    if (isInMyList) {
      dispatch(removeFromMyList(movie.id))
      dispatch(showToast({ message: "Removed from My List", type: "info" }))
    } else {
      dispatch(addToMyList(movie));
      dispatch(showToast({ message: "Added to My List", type: "success" }))
    }
  }

  return (
    <div
      className="relative flex-shrink-0
        w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      {/*CARD*/}
      <div
        className={`
          relative aspect-[2/3]
          rounded-md overflow-hidden bg-black
          transition-all duration-300 cursor-pointer
          ${isHovered
            ? "md:scale-[1.15] z-40 shadow-2xl ring-1 ring-white/20"
            : "z-10 hover:ring-1 hover:ring-white/10"
          }
        `}
      >
        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 md:hidden
          bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
          <p className="text-[10px] sm:text-xs font-medium text-white line-clamp-1">
            {movie.title}
          </p>
        </div>


        {isHovered && (
          <div className="absolute inset-0
            bg-gradient-to-t from-black/90 via-black/40 to-transparent
            flex flex-col justify-end">
            <div className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">


              <div className="flex items-center gap-1.5 sm:gap-2">

                <button
                  aria-label="Play"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white
                    flex items-center justify-center
                    hover:bg-gray-200 active:scale-95 transition"
                >
                  <Play size={14} className="text-black ml-0.5" />
                </button>


                <button
                  onClick={handleAddRemove}
                  aria-label={isInMyList ? "Remove from My List" : "Add to My List"}
                  className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full
                    flex items-center justify-center
                    active:scale-95 transition
                    ${isInMyList
                      ? "bg-emerald-500"
                      : "border border-white/40"
                    }`}
                >
                  {isInMyList
                    ? <Check size={14} className="text-black" />
                    : <Plus size={14} className="text-white" />
                  }
                </button>

                <button
                  aria-label="Like"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full
                    border border-white/40
                    flex items-center justify-center
                    hover:border-white active:scale-95 transition"
                >
                  <ThumbsUp size={14} className="text-white" />
                </button>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                  {movie.title}
                </p>
                {movie.rating && (
                  <p className="text-[10px] sm:text-xs text-green-400 font-medium">
                    ★ {movie.rating}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
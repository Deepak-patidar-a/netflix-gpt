import { Play, Plus, ThumbsUp, Check} from "lucide-react";
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

  const isAdded = myList.some((m) => m.id === movie.id);

  if (!movie?.poster) return null;

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsHovered(true);
    }, 180); // Netflix-like delay
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setIsHovered(false);
  };

  return (
    // OUTER WRAPPER → allows overflow escape
    <div
      className="relative flex-shrink-0 w-[160px] md:w-[180px] lg:w-[200px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* CARD */}
      <div
        className={`
          relative aspect-[2/3]
          rounded-md overflow-hidden
          bg-black
          transition-all duration-300
          ${isHovered ? "md:scale-[1.15] z-40 shadow-2xl" : "z-10"}
        `}
      >
        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        {/* Hover Overlay */}
        {isHovered && (
          <div
            className="
              absolute inset-0
              bg-gradient-to-t from-black/90 via-black/40 to-transparent
              flex flex-col justify-end
            "
          >
            <div className="p-3 space-y-2">
              {/* Buttons */}
              <div className="flex items-center gap-2">
                <button className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <Play size={18} className="text-black ml-0.5" />
                </button>

                {isInMyList ? (
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeFromMyList(movie.id));
                        dispatch(
                        showToast({
                            message: "Removed from My List",
                            type: "info",
                        })
                        );
                        }}
                        className="h-8 w-8 rounded-full
                                bg-emerald-500 flex items-center justify-center"
                        title="Remove from My List"
                    >
                        <Check size={16} className="text-black" />
                    </button>
                    ) : (
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToMyList(movie))
                        dispatch(
                        showToast({
                            message: "Added to My List",
                            type: "success",
                        })
                        );
                        }}
                        className="h-8 w-8 rounded-full
                                border border-white/40
                                flex items-center justify-center"
                        title="Add to My List"
                    >
                        <Plus size={16} className="text-white" />
                    </button>
                    )}

                <button className="h-8 w-8 rounded-full border border-white/40 flex items-center justify-center">
                  <ThumbsUp size={16} className="text-white" />
                </button>
              </div>

              {/* Title & Rating */}
              <div>
                <p className="text-sm font-semibold text-white line-clamp-1">
                  {movie.title}
                </p>
                {movie.rating && (
                  <p className="text-xs text-green-400 font-medium">
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

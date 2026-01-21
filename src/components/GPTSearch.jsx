import GPTMovieSuggetion from "./GPTMovieSuggetion";
import GPTSearchBar from "./GPTSearchBar";
import { BACKGROUND_IMAGE_URL } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* background overlay */}
      <div className="
        absolute inset-0
        bg-no-repeat
        opacity-70
        bg-[length:110%]
        bg-[position:60%_20%]
        md:bg-[length:100%]
        lg:bg-[length:100%]"
      style={{
      backgroundImage:
      `url(${BACKGROUND_IMAGE_URL})`,
     }}>

  </div>
    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div> */}


      {/* content */}
      <div className="relative z-10 pt-32 px-6">
        <GPTSearchBar />
        <GPTMovieSuggetion />
      </div>
    </div>
  );
};

export default GPTSearch;

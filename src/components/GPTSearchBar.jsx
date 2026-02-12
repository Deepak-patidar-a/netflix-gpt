import { useRef, useState } from "react";
import client from "../utils/openAi";
import { useDispatch } from "react-redux";
import { fetchGptMoviesFailure, fetchGptMoviesStart, fetchGptMoviesSuccess } from "../utils/gptMovieSlice";

const GPTSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);

  const handleSearchGPT = async () => {
    const query = searchText.current?.value.trim()
    if (!query || searching) return

    try {
      setSearching(true);
      dispatch(fetchGptMoviesStart())

      const gptPrompt = `You are a strict JSON API that returns movie recommendations.

            User Query:
            "${searchText.current.value}"

            STRICT RULES (must follow ALL):
            1. Return ONLY valid JSON (no markdown, no comments, no text outside JSON).
            2. Return EXACTLY 4 movies.
            3. Movies must be well-known and searchable.
            4. Prefer movies over TV shows.
            5. Use English titles.
            6. Follow the JSON schema EXACTLY — do NOT rename, add, or remove fields.
            7. Each value must be a primitive (string or number only).
            8. "genre" must be ONE short genre (e.g. "Action", "Drama", "Sci-Fi").
            9. "ai_reason" must be max 12 words (short, UI friendly).
            10. "id" must be a string: "1", "2", "3", "4".

            REQUIRED JSON SCHEMA:
            {
            "results": [
                {
                "id": "1",
                "title": "Movie Title",
                "release": 2021,
                "genre": "Drama",
                "ai_tagline": "3-4 word tagline",
                "ai_reason": "Short 1-2 line reason",
                "confidence": "high"
                }
            ]
            }

            If you cannot follow this schema exactly, return:
            {
            "results": []
            }`;

      const gptResult = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: gptPrompt }],
      })

      const json = JSON.parse(gptResult.choices[0].message.content)
      dispatch(fetchGptMoviesSuccess(json.results))
    } catch (err) {
      dispatch(fetchGptMoviesFailure("Invalid GPT response"))
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">

      <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-center">
        🎬 What would you like to watch?
      </h2>

      <form
        className="flex flex-col sm:flex-row gap-2 sm:gap-3
          bg-black/70 p-3 sm:p-4
          rounded-lg shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder="e.g. Something like Inception..."
          className="flex-1 px-4
            py-3 sm:py-3
            rounded-md bg-gray-900 text-white text-sm sm:text-base
            placeholder-gray-500
            outline-none focus:ring-2 focus:ring-red-600
            transition"
        />

        <button
          type="button"
          onClick={handleSearchGPT}
          disabled={searching}
          className={`w-full sm:w-auto
            px-5 sm:px-6 py-3
            rounded-md text-white text-sm sm:text-base font-semibold
            transition active:scale-95
            ${searching
              ? "bg-red-700/50 cursor-not-allowed"
              : "bg-red-700 hover:bg-red-800"
            }`}
        >
          {searching ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Searching...
            </span>
          ) : (
            "Search"
          )}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
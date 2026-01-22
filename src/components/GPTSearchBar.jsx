import { useRef } from "react";
import client from "../utils/openAi";
import { useDispatch } from "react-redux";
import { fetchGptMoviesFailure, fetchGptMoviesStart, fetchGptMoviesSuccess } from "../utils/gptMovieSlice";

const GPTSearchBar = () => {
    const searchText = useRef(null);
    const dispatch = useDispatch()
    

    const handleSearchGPT = async () => { 
        // console.log(searchText.current.value);
        //make an api call to openAI with the search text
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
                "confidence": "high" // high | medium | low
                }
            ]
            }

            If you cannot follow this schema exactly, return:
            {
            "results": []
            }`;

        const gptResult = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'user', content: gptPrompt }
            ],
            });
            //console.log("gptResult :",gptResult.choices[0].message.content);
            dispatch(fetchGptMoviesStart());

            try {
            const json = JSON.parse(gptResult.choices[0].message.content);
            // console.log("Parsed JSON :",json);
            dispatch(fetchGptMoviesSuccess(json.results));
            } catch (err) {
            dispatch(fetchGptMoviesFailure("Invalid GPT response"));
            }
     }


  return (
    <div className="max-w-3xl mx-auto">
      <form className="flex gap-2 bg-black/70 p-4 rounded-lg" onSubmit={(e) => e.preventDefault()}>
        <input
            ref={searchText}
          type="text"
          placeholder="What would you like to watch today?"
          className="flex-1 px-4 py-3 rounded-md bg-gray-900 text-white outline-none"
        />
        <button className="px-6 py-3 bg-red-700 rounded-md text-white font-semibold"
        onClick={handleSearchGPT}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;

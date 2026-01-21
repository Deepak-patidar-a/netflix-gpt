const GPTMovieSuggetion = () => {
  return (
    <div className="mt-10 max-w-6xl mx-auto text-white">
      <h2 className="text-xl font-semibold mb-4">
        Movie Suggestions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* placeholder cards */}
        {[1,2,3,4].map((i) => (
          <div
            key={i}
            className="h-40 bg-gray-800 rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggetion;

const GPTSearchBar = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <form className="flex gap-2 bg-black/70 p-4 rounded-lg">
        <input
          type="text"
          placeholder="What would you like to watch today?"
          className="flex-1 px-4 py-3 rounded-md bg-gray-900 text-white outline-none"
        />
        <button className="px-6 py-3 bg-red-700 rounded-md text-white font-semibold">
          Search
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;




export const Banner = ({movie,onMoreInfo}) => {

  return (
    <div className="relative h-screen">
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black">
        <h2 className="text-5xl text-white font-bold mb-4">{movie.title}</h2>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-white">{movie.release_date}</span>
          <span className="px-2 py-1 bg-gray-700 rounded text-white text-sm">
            4K
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= Math.round(movie.vote_average / 2)
                    ? "text-red-500"
                    : "text-gray-500"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <p className="max-w-2xl text-white mb-6">{movie.overview}</p>

        <div className="flex space-x-4">
          <button className="px-8 py-2 bg-red-600 rounded hover:bg-red-700">
            Play
          </button>
          <button
            onClick={onMoreInfo}
            className="px-8 py-2 bg-gray-600 bg-opacity-50  cursor-pointer rounded hover:bg-opacity-70"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

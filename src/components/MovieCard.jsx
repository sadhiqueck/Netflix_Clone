

const MovieCard = ({ movie, onClick }) => {
 

  return (
 <div 
  className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-gray-800 rounded cursor-pointer shadow-lg hover:scale-105 transition-transform"
  onClick={onClick}
>

  <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
    className="w-full h-72 object-cover"
  />

  <div className="p-2">
    <h3 className="text-white text-lg mb-2 line-clamp-2">{movie.title}</h3>
    <div className="flex items-center justify-between overflow-hidden text-sm text-gray-400">
      <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
    </div>
  </div>
</div>
  );
};

export default MovieCard;

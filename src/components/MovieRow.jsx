import React, { useRef } from "react";
import MovieCard from "./movieCard";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const MovieRow = ({ title, movies,onMovieClick }) => {
    
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 500;
      current.scrollTo({
        left:
          current.scrollLeft +
          (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) {
    return (
      <div className="px-4 md:px-8 mb-8">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
          {title}
        </h2>
        <div className="text-gray-400">No movies available</div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 mb-8 ">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 ">
        {title}
      </h2>

       
       {/* scroll btns */}
      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-75"
          style={{ marginTop: "0", marginBottom: "20%" }}
        >
          <ArrowLeftIcon />
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-75"
          style={{ marginTop: "0", marginBottom: "20%" }}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;

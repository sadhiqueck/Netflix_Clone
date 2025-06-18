import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { IMAGE_URL } from "../services/tmdbApi";
import { fetchMovieDetailsWithVideos } from "../services/tmdbApi";
import { useNavigate } from "react-router-dom";

const MovieModal = ({ movie, isOpen, onClose }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [videoKey, setVideoKey] = useState(null);
  const navigate = useNavigate();


  const fetchMovieData = useCallback(async () => {
    try {
      console.log("fsdnjfk");
      const data = await fetchMovieDetailsWithVideos(movie.id);

      const trailer = data.videos?.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      setMovieDetails(data);
      setVideoKey(trailer?.key);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }, [movie]);


  useEffect(() => {
    if (isOpen && movie) {
      fetchMovieData();
    }
  }, [isOpen, movie, fetchMovieData]);
  

  const handleWatchTrailer = () => {
    if (videoKey) {
      navigate(`/watch/${movie.id}/${videoKey}`);
    }
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm ">
      <div className="relative max-w-4xl mx-auto mt-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-4xl z-10 hover:text-gray-300"
        >
          <X />
        </button>
        <div className="bg-zinc-900 rounded-lg overflow-hidden">
          <div className="relative h-[500px]">
            <img
              src={`${IMAGE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900" />
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="text-white text-4xl font-bold mb-4">
                {movie.title}
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-green-500 font-semibold">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
                <span className="text-white">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="text-white border border-gray-400 px-2 py-1 text-sm">
                  PG-13
                </span>
                <span className="text-white bg-red-600 px-2 font-bold py-1 rounded text-sm">
                  4K
                </span>
              </div>

              <p className="text-white text-lg max-w-2xl mb-6">
                {movie.overview}
              </p>

              <div className="flex gap-4">
                <button className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 flex items-center gap-2">
                  <span>▶</span> Play
                </button>

                {videoKey && (
                  <button
                    onClick={handleWatchTrailer}
                    className="bg-gray-600 text-white px-6 py-3 cursor-pointer rounded font-semibold hover:bg-gray-500"
                  >
                    Watch Trailer
                  </button>
                )}

                <button className="border border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:bg-opacity-20">
                  + My List
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="text-gray-400">Genres: </span>
                <span className="text-white">
                  {movieDetails?.genres?.map((g) => g.name).join(", ") ||
                    "Loading..."}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Original language: </span>
                <span className="text-white">
                  {movie.original_language?.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Total votes: </span>
                <span className="text-white">{movie.vote_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;

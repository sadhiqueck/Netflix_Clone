import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieApi } from "../services/tmdbApi";

const TrailerPlayerPage = () => {
  const { movieId, videoKey } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await movieApi.getMovieDetails(movieId);
        console.log(response)
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
     
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          ← Back
        </button>
        
        {movie && (
          <div className="text-center">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400">
              {movie.release_date?.split("-")[0]}
            </p>
          </div>
        )}
        <div className="w-20"></div>
      </div>

      <div className="flex justify-center items-center flex-grow p-4">
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            className="w-full h-full rounded"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerPlayerPage;

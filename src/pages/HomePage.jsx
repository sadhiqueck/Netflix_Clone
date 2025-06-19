import { useEffect, useState } from "react";
import { movieApi } from "../services/tmdbApi";
import Navbar from "../components/NavBar";
import { Banner } from "../components/Banner";
import MovieRow from "../components/MovieRow";
import MovieModal from "../components/MovieModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMovie, setSelectedMovie] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const { user: authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const [trending, popular, topRated, upcoming] = await Promise.all([
          movieApi.getTrending(),
          movieApi.getPopular(),
          movieApi.getTopRated(),
          movieApi.getUpcoming(),
        ]);

        setTrendingMovies(trending.data.results);
        setPopularMovies(popular.data.results);
        setTopRatedMovies(topRated.data.results);
        setUpcomingMovies(upcoming.data.results);

        if (trending.data.results.length > 0) {
          setFeaturedMovie(trending.data.results[0]);
        }
        
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  console.log(selectedMovie);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleWatchTrailer = (movieId, trailerKey) => {
    setIsModalOpen(false);
    navigate(`/watch/${movieId}/${trailerKey}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen  bg-(--color-netflix-dark)">
        <Navbar userData={user} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-(--color-netflix-dark)">
        <Navbar userData={user} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="netflix-button"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-netflix-dark)">
      <Navbar userData={user} />
      <Banner
        movie={featuredMovie}
        onMoreInfo={() => handleMovieSelect(featuredMovie)}
      />

      <div>
        <MovieRow
          title="Trending Now"
          movies={trendingMovies}
          onMovieClick={handleMovieSelect}
        />
        <MovieRow
          title="Popular Movies"
          movies={popularMovies}
          onMovieClick={handleMovieSelect}
        />
        <MovieRow
          title="Top Rated"
          movies={topRatedMovies}
          onMovieClick={handleMovieSelect}
        />
        <MovieRow
          title="Coming Soon"
          movies={upcomingMovies}
          onMovieClick={handleMovieSelect}
        />
      </div>

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onWatchTrailer={handleWatchTrailer}
      />
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import DeleteMovie from '../components/DeleteMovie';

const DeleteMoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://movie-store-app-2zof.onrender.com/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleMovieDelete = async () => {
    if (selectedMovie) {
      try {
        await axios.delete(`https://movie-store-app-2zof.onrender.com/movies/${selectedMovie._id}`);
        setMovies(movies.filter((movie) => movie._id !== selectedMovie._id));
        setSelectedMovie(null);
        setSuccessMessage('Movie deleted successfully!');
        setErrorMessage(''); // Clear error message
      } catch (error) {
        setErrorMessage('Error deleting movie. Please try again.');
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <div>
      <h2>Delete Movie</h2>
      <MovieList movies={movies} onSelect={handleMovieSelect} />
      {selectedMovie && (
        <div>
          <DeleteMovie movieId={selectedMovie._id} onDelete={handleMovieDelete} />
        </div>
      )}
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default DeleteMoviePage;

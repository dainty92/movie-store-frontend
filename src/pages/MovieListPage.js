import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);

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

  return (
    <div>
      <h2>Movie List</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default MovieListPage;

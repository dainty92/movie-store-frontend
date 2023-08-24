import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import axios from 'axios';
import AppRoutes from './Routes';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = useCallback(async (page) => {
    try {
      let url = `https://movie-store-app-2zof.onrender.com/movies?page=${page}&perPage=5`;
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }
      console.log('Fetch URL:', url);
      
      const response = await axios.get(url);
      setMovies(response.data.movies);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    fetchMovies(1);
  };  

  const handleMovieAdded = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const handleMovieUpdated = (updatedMovie) => {
    const updatedMovies = movies.map((movie) =>
      movie._id === updatedMovie._id ? updatedMovie : movie
    );
    setMovies(updatedMovies);
  };

  const handleMovieDeleted = (deletedMovieId) => {
    const updatedMovies = movies.filter((movie) => movie._id !== deletedMovieId);
    setMovies(updatedMovies);
  };

  const handlePaginationClick = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Admin Panel</h1>
      </header>
      <main className='container'>
        <AddMovie onMovieAdded={handleMovieAdded} />
        <div className='movie-list'>
          <div className="search-bar">
            <input
              className='search-input'
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie..."
            />
            <button className="search-button" onClick={() => fetchMovies(1)}>Search</button>
            <button className="clear-button" onClick={clearSearch}>
              Clear Search
            </button>
          </div>
        <MovieList 
          movies={movies}
          onUpdate={handleMovieUpdated}
          onDelete={handleMovieDeleted} 
        />
        </div>
        <AppRoutes />
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button className='button' key={index + 1} onClick={() => handlePaginationClick(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

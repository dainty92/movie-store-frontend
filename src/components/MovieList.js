import React from 'react';
import UpdateMovie from './UpdateMovie';
import DeleteMovie from './DeleteMovie';

const MovieList = ({ movies, onUpdate, onDelete }) => {
  return (
    <div>
      <h2>Movie List</h2>
      <ul className='movie-item'>
        {movies.map((movie) => (
          <li className='movie-info' key={movie._id}>
            <h4>{movie.title} - {movie.director} ({movie.releaseYear})</h4>
            <UpdateMovie movie={movie} onUpdate={onUpdate} />
            <DeleteMovie movieId={movie._id} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = ({ movie, onUpdate }) => {
  const [title, setTitle] = useState(movie.title);
  const [director, setDirector] = useState(movie.director);
  const [releaseYear, setReleaseYear] = useState(movie.releaseYear);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (successMessage) {
      // Set a timeout to clear the success message after 3000 milliseconds (3 seconds)
      const timeoutId = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      // Cleanup function to clear the timeout when the component unmounts or successMessage changes
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://movie-store-app-2zof.onrender.com/movies/${movie._id}`, {
        title,
        director,
        releaseYear: parseInt(releaseYear),
      });
      onUpdate(response.data);
      setSuccessMessage('Movie updated successfully!');
      setErrorMessage('');
    } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Error updating movie. Please try again.');
        console.error('Error updating movie:', error);
    }
  };

  return (
    <div>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form className='form' onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Director:</label>
        <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
        <label>Release Year:</label>
        <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
        <button className='button' type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;

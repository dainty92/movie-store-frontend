import React, { useState } from 'react';
import axios from 'axios';

const DeleteMovie = ({ movieId, onDelete }) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleDelete = async () => {
      try {
        if (window.confirm('Are you sure you want to delete this movie?')) {
          await axios.delete(`https://movie-store-app-2zof.onrender.com/movies/${movieId}`);
          onDelete(movieId);
          setSuccessMessage('Movie deleted successfully!');
          setErrorMessage('');
        }
      } catch (error) {
        setSuccessMessage('');
        setErrorMessage('Error deleting movie. Please try again.');
        console.error('Error deleting movie:', error);
      }
    };
  
    return (
      <div>
        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button className='button' onClick={handleDelete}>Delete Movie</button>
      </div>
    );
  };
  
  export default DeleteMovie;
  
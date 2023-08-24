// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';

describe('App', () => {
  test('renders Movie Admin Panel header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Movie Admin Panel/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('displays search input and buttons', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search for a movie...');
    const searchButton = screen.getByText('Search');
    const clearButton = screen.getByText('Clear Search');
    
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  test('fetches movies and displays them', async () => {
    // Create a new instance of the axios mock adapter
    const mock = new MockAdapter(axios);

    // Mock a successful GET request to return a sample list of movies
    mock.onGet('https://movie-store-app-2zof.onrender.com/movies').reply(200, {
      movies: [
        { _id: '1', title: 'Movie 1', director: 'Director 1', releaseYear: 2020 },
        { _id: '2', title: 'Movie 2', director: 'Director 2', releaseYear: 2021 },
      ],
    });

    // Render the component
    render(<App />);
    
    // Use waitFor to wait for the movies to be fetched and displayed
    await waitFor(() => {
      const movieTitles = screen.getAllByTestId('movie-title');
      expect(movieTitles.length).toBe(2);
    });

    // Clean up the axios mock adapter
    mock.restore();
  });

  test('adds a new movie and displays it', async () => {
    render(<App />);
    const titleInput = screen.getByPlaceholderText('Search for a movie...');
    const addButton = screen.getByText('Add Movie');
    
    // Simulate adding a new movie
    fireEvent.change(titleInput, { target: { value: 'New Movie' } });
    fireEvent.click(addButton);
    
    // Use waitFor to wait for the new movie to appear in the list
    await waitFor(() => {
      const newMovieTitle = screen.getByText('New Movie');
      expect(newMovieTitle).toBeInTheDocument();
    });
  });

  test('updates an existing movie and displays the updated details', async () => {
    render(<App />);
    const updateButton = screen.getByText('Update');
    
    // Simulate updating an existing movie
    fireEvent.click(updateButton);
    
    // Use waitFor to wait for the updated details to appear in the list
    await waitFor(() => {
      const updatedMovieDetails = screen.getByText('Updated Movie Details');
      expect(updatedMovieDetails).toBeInTheDocument();
    });
  });

  test('deletes a movie and removes it from the list', async () => {
    render(<App />);
    const deleteButton = screen.getByText('Delete');
    
    // Simulate deleting a movie
    fireEvent.click(deleteButton);
    
    // Use waitFor to wait for the movie to be removed from the list
    await waitFor(() => {
      const deletedMovie = screen.queryByText('Deleted Movie');
      expect(deletedMovie).not.toBeInTheDocument();
    });
  });

  // You can add more tests to cover interactions like adding, updating, and deleting movies
});

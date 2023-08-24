import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieListPage from './pages/MovieListPage';
import AddMoviePage from './pages/AddMoviePage';
import DeleteMoviePage from './pages/DeleteMoviePage';
import UpdateMoviePage from './pages/UpdateMoviePage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={MovieListPage} />
        <Route path="/add" component={AddMoviePage} />
        <Route path="/update" component={UpdateMoviePage} />
        <Route path="/delete" component={DeleteMoviePage} />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Categories from './pages/Categories';
import RecipeDetails from './pages/RecipeDetails';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="categories" element={<Categories />} />
        <Route path="recipe/:id" element={<RecipeDetails />} />
      </Route>
    </Routes>
  );
};

export default Router;
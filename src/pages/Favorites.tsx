import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import RecipeList from '../components/recipes/RecipeList';

const Favorites: React.FC = () => {
  const { favoriteRecipes } = useRecipes();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please log in to view your favorites</h2>
        <Link to="/login" className="btn-primary">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Favorite Recipes</h1>
        <p className="text-gray-600">
          All your saved favorites in one place
        </p>
      </div>
      
      <RecipeList 
        recipes={favoriteRecipes} 
        emptyMessage="You haven't saved any favorites yet. Start exploring recipes!" 
      />
      
      {favoriteRecipes.length === 0 && (
        <div className="text-center mt-4">
          <Link to="/recipes" className="btn-primary">
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
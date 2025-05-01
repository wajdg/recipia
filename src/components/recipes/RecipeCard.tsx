import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Star, Heart } from 'lucide-react';
import { Recipe } from '../../types';
import { useRecipes } from '../../contexts/RecipeContext';
import { useAuth } from '../../contexts/AuthContext';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, featured = false }) => {
  const { toggleFavorite, isFavorite } = useRecipes();
  const { isAuthenticated } = useAuth();
  const favorite = isFavorite(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  return (
    <div 
      className={`card group ${
        featured 
          ? 'md:col-span-2 md:row-span-2' 
          : ''
      }`}
    >
      <Link to={`/recipe/${recipe.id}`} className="block h-full">
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Favorite button */}
          {isAuthenticated && (
            <button 
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition-transform hover:scale-110 z-10"
            >
              <Heart 
                size={20} 
                className={favorite ? 'fill-primary-500 text-primary-500' : 'text-gray-400'} 
              />
            </button>
          )}
          
          {/* Categories */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {recipe.categories.slice(0, 2).map((category, index) => (
              <span key={index} className="badge-primary">
                {category}
              </span>
            ))}
            {recipe.categories.length > 2 && (
              <span className="badge bg-gray-100 text-gray-800">
                +{recipe.categories.length - 2}
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className={`font-medium ${featured ? 'text-xl' : 'text-lg'} mb-2 group-hover:text-primary-600 transition-colors`}>
            {recipe.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {recipe.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{recipe.prepTime + recipe.cookTime} min</span>
              </div>
              
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{recipe.author.username}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span>{recipe.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
import React from 'react';
import { Recipe } from '../../types';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  title?: string;
  emptyMessage?: string;
  featured?: boolean;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  title, 
  emptyMessage = "No recipes found", 
  featured = false 
}) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      )}
      
      <div className={featured 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      }>
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            featured={featured && recipe.id === recipes[0].id} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
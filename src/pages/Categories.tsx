import React from 'react';
import { useRecipes } from '../contexts/RecipeContext';
import CategoryCard from '../components/categories/CategoryCard';

const Categories: React.FC = () => {
  const { categories } = useRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recipe Categories</h1>
        <p className="text-gray-600">
          Browse recipes by category to find exactly what you're looking for
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import RecipeCard from '../components/recipes/RecipeCard';
import CategoryCard from '../components/categories/CategoryCard';

const Home: React.FC = () => {
  const { recipes, categories } = useRecipes();
  const { isAuthenticated } = useAuth();
  
  // Get featured recipes (first 5)
  const featuredRecipes = recipes.slice(0, 5);
  
  // Get random featured categories (first 4)
  const featuredCategories = categories.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[80vh] min-h-[600px] flex items-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Discover Delicious Recipes for Every Occasion
            </h1>
            <p className="text-xl mb-8 animate-fade-in">
              Find, save, and share recipes from around the world. Cook with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link to="/search" className="btn-primary py-3 px-6">
                <Search size={20} className="mr-2" />
                Find Recipes
              </Link>
              {!isAuthenticated && (
                <Link to="/signup" className="btn-outline border-white text-white hover:bg-white/20 py-3 px-6">
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Categories</h2>
            <Link to="/categories" className="text-primary-600 font-medium flex items-center hover:text-primary-700 transition-colors">
              View All
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Recipes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Recipes</h2>
            <Link to="/recipes" className="text-primary-600 font-medium flex items-center hover:text-primary-700 transition-colors">
              View All
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe, index) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      {!isAuthenticated && (
        <section className="py-16 bg-primary-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Cooking?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create an account to save your favorite recipes, track nutrition, and more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="btn bg-white text-primary-600 hover:bg-gray-100 py-3 px-6">
                Sign Up Now
              </Link>
              <Link to="/recipes" className="btn border-2 border-white text-white hover:bg-white/20 py-3 px-6">
                Browse Recipes
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
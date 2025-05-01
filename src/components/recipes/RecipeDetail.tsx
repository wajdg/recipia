import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, User, Star, Heart, Users, ChevronLeft, UtensilsCrossed } from 'lucide-react';
import { useRecipes } from '../../contexts/RecipeContext';
import { useAuth } from '../../contexts/AuthContext';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import NutrientInfo from '../nutrients/NutrientInfo';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, toggleFavorite, isFavorite, getComments, markAsPrepared } = useRecipes();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');
  const [servings, setServings] = useState(1);

  if (!id) return <div>Recipe not found</div>;
  
  const recipe = getRecipeById(id);
  const comments = getComments(id);
  const favorite = isFavorite(id);

  const handlePrepared = async () => {
    try {
      await markAsPrepared(id, servings);
      alert('Recipe marked as prepared and added to your nutrition chart!');
    } catch (error) {
      console.error('Failed to mark recipe as prepared:', error);
    }
  };
  
  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Recipe not found</h2>
        <button 
          onClick={() => navigate('/recipes')}
          className="btn-primary"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-96 md:h-[500px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        
        <div className="container mx-auto px-4 relative z-10 pb-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        
          {isAuthenticated && (
            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex space-x-2">
              <button 
                onClick={() => toggleFavorite(recipe.id)}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <Heart 
                  size={24} 
                  className={favorite ? 'fill-primary-500' : ''} 
                />
              </button>
              <button
                onClick={handlePrepared}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
                title="Mark as prepared"
              >
                <UtensilsCrossed size={24} />
              </button>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.categories.map((category, index) => (
              <span key={index} className="badge-primary">
                {category}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {recipe.title}
          </h1>
          
          <p className="text-white/90 mb-6 md:w-3/4">
            {recipe.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/80">
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min</span>
            </div>
            
            <div className="flex items-center">
              <Users size={18} className="mr-2" />
              <span>Serves {recipe.servings}</span>
            </div>
            
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              <span>By {recipe.author.username}</span>
            </div>
            
            <div className="flex items-center">
              <Star size={18} className="text-yellow-400 mr-1" />
              <span>{recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add servings selector */}
      {isAuthenticated && (
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="servings" className="text-gray-700">Servings prepared:</label>
            <input
              type="number"
              id="servings"
              min="1"
              max="10"
              value={servings}
              onChange={(e) => setServings(parseInt(e.target.value))}
              className="input w-20"
            />
          </div>
        </div>
      )}
      
      {/* Recipe Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'ingredients' 
                      ? 'border-primary-500 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'instructions' 
                      ? 'border-primary-500 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Instructions
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'nutrition' 
                      ? 'border-primary-500 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Nutrition
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === 'ingredients' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li 
                        key={index}
                        className="flex items-center py-2 border-b border-gray-100"
                      >
                        <div className="w-16 text-sm font-medium text-gray-600">
                          {ingredient.amount} {ingredient.unit}
                        </div>
                        <div>{ingredient.name}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'instructions' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                  <ol className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="pt-1">
                          {instruction}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              
              {activeTab === 'nutrition' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Nutrition Information</h2>
                  <NutrientInfo 
                    calories={recipe.calories}
                    protein={recipe.protein}
                    carbs={recipe.carbs}
                    fat={recipe.fat}
                  />
                </div>
              )}
            </div>
            
            {/* Comments Section */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6">Comments ({comments.length})</h2>
              
              {isAuthenticated ? (
                <CommentForm recipeId={recipe.id} />
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <p className="text-gray-600">
                    <a href="/login" className="text-primary-600 font-medium">Sign in</a> to leave a comment
                  </p>
                </div>
              )}
              
              <div className="mt-8">
                <CommentList comments={comments} />
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/3">
            {/* Add sidebar content here - e.g., related recipes */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">You might also like</h3>
              {/* Add related recipes here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
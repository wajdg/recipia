import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeList from '../components/recipes/RecipeList';
import NutrientChart from '../components/nutrients/NutrientChart';
import { formatDistanceToNow } from '../utils/dateUtils';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { favoriteRecipes, recentSearches, nutrientData } = useRecipes();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please log in to view your dashboard</h2>
        <Link to="/login" className="btn-primary">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Greeting */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-2">Welcome back, {user.username}!</h1>
              <p className="opacity-90">
                Track your favorite recipes and nutrition insights from your personal dashboard.
              </p>
            </div>
            
            {/* Favorites */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Favorites</h2>
                <Link to="/favorites" className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors">
                  View All
                </Link>
              </div>
              
              {favoriteRecipes.length > 0 ? (
                <RecipeList 
                  recipes={favoriteRecipes.slice(0, 3)} 
                  emptyMessage="You haven't saved any favorites yet. Start exploring recipes!" 
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    You haven't saved any favorites yet. Start exploring recipes!
                  </p>
                  <Link to="/recipes" className="btn-primary">
                    Browse Recipes
                  </Link>
                </div>
              )}
            </div>
            
            {/* Nutrient Chart */}
            <NutrientChart data={nutrientData} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-700 text-xl font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{user.username}</h3>
                  <p className="text-gray-500 text-sm">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <Link to="/profile" className="btn-secondary w-full text-center">
                Edit Profile
              </Link>
            </div>
            
            {/* Recent Searches */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Recent Searches</h3>
              
              {recentSearches.length > 0 ? (
                <ul className="space-y-3">
                  {recentSearches.slice(0, 5).map(search => (
                    <li key={search.id} className="flex items-center justify-between">
                      <Link 
                        to={`/search?q=${encodeURIComponent(search.query)}`}
                        className="text-primary-600 hover:text-primary-700 truncate max-w-[70%]"
                      >
                        <Search size={16} className="inline-block mr-2 text-gray-400" />
                        {search.query}
                      </Link>
                      <span className="text-xs text-gray-500">
                        <Clock size={12} className="inline-block mr-1" />
                        {formatDistanceToNow(search.createdAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No recent searches
                </p>
              )}
              
              <div className="mt-4">
                <Link to="/search" className="btn-outline w-full text-center">
                  Search Recipes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
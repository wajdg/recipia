import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRecipes } from '../contexts/RecipeContext';
import ProfileForm from '../components/profile/ProfileForm';
import NutrientChart from '../components/nutrients/NutrientChart';
import { formatDistanceToNow } from '../utils/dateUtils';

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { favoriteRecipes, recentSearches, nutrientData } = useRecipes();
  const [isEditing, setIsEditing] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please log in to view your profile</h2>
        <Link to="/login" className="btn-primary">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600">
          Manage your personal information and track your activity
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          {isEditing ? (
            <ProfileForm onCancel={() => setIsEditing(false)} />
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="mb-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-700 text-2xl font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold">{user.username}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center text-gray-700">
                    <User size={18} className="mr-2" />
                    <span>Member since</span>
                  </div>
                  <span className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center text-gray-700">
                    <User size={18} className="mr-2" />
                    <span>Favorites</span>
                  </div>
                  <span className="text-gray-900">{favoriteRecipes.length}</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary w-full mt-6"
              >
                <Settings size={18} className="mr-2" />
                Edit Profile
              </button>
            </div>
          )}
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm mt-8">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            
            {recentSearches.length > 0 ? (
              <ul className="space-y-3">
                {recentSearches.slice(0, 5).map(search => (
                  <li key={search.id} className="flex items-center justify-between">
                    <Link 
                      to={`/search?q=${encodeURIComponent(search.query)}`}
                      className="text-primary-600 hover:text-primary-700 truncate max-w-[70%]"
                    >
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
                No recent activity
              </p>
            )}
          </div>
        </div>
        
        {/* Nutrition Overview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Nutrition Overview</h3>
            <NutrientChart data={nutrientData} />
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Avg. Calories</div>
                  <div className="text-lg font-semibold">
                    {Math.round(
                      nutrientData.reduce((sum, day) => sum + day.calories, 0) / nutrientData.length
                    )}
                    <span className="text-sm font-normal text-gray-500 ml-1">kcal</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Avg. Protein</div>
                  <div className="text-lg font-semibold">
                    {Math.round(
                      nutrientData.reduce((sum, day) => sum + day.protein, 0) / nutrientData.length
                    )}
                    <span className="text-sm font-normal text-gray-500 ml-1">g</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Avg. Carbs</div>
                  <div className="text-lg font-semibold">
                    {Math.round(
                      nutrientData.reduce((sum, day) => sum + day.carbs, 0) / nutrientData.length
                    )}
                    <span className="text-sm font-normal text-gray-500 ml-1">g</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Avg. Fat</div>
                  <div className="text-lg font-semibold">
                    {Math.round(
                      nutrientData.reduce((sum, day) => sum + day.fat, 0) / nutrientData.length
                    )}
                    <span className="text-sm font-normal text-gray-500 ml-1">g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
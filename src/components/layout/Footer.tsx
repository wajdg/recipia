import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">TastyBites</h3>
            <p className="text-gray-400 mb-4">
              Discover delicious recipes from around the world. Search, save favorites, and keep track of your nutrition.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/breakfast" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link to="/categories/lunch" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Lunch
                </Link>
              </li>
              <li>
                <Link to="/categories/dinner" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Dinner
                </Link>
              </li>
              <li>
                <Link to="/categories/dessert" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Dessert
                </Link>
              </li>
              <li>
                <Link to="/categories/vegetarian" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Vegetarian
                </Link>
              </li>
              <li>
                <Link to="/categories/gluten-free" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Gluten-Free
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TastyBites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
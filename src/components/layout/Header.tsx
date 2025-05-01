import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0  left-0 right-0 z-50 transition-all duration-300 h-13${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className={`flex items-center space-x-2 transition-colors  ${
              isScrolled ? 'text-primary-600' : 'text-black' 
            }`}
          >
            <div className="w-16 h-16">
              <img 
                src="/src/components/recipia.png" 
                alt="Recipia" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-2xl">Recipia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`transition-colors ${
                isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-black hover:text-primary-200'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/recipes" 
              className={`transition-colors ${
                isScrolled ? 'text-white-800 hover:text-primary-600' : 'text-black hover:text-primary-200'
              }`}
            >
              Recipes
            </Link>
            <Link 
              to="/categories" 
              className={`transition-colors ${
                isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-black hover:text-primary-200'
              }`}
            >
              Categories
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/favorites" 
                  className={`transition-colors ${
                    isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-black hover:text-primary-200'
                  }`}
                >
                  <Heart size={20} className="inline-block mr-1" />
                  <span className="hidden lg:inline">Favorites</span>
                </Link>
                <Link 
                  to="/profile" 
                  className={`transition-colors ${
                    isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-black hover:text-primary-200'
                  }`}
                >
                  <User size={20} className="inline-block mr-1" />
                  <span className="hidden lg:inline">Profile</span>
                </Link>
                <button 
                  onClick={logout}
                  className={`transition-colors ${
                    isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-black hover:text-primary-200'
                  }`}
                >
                  <LogOut size={20} className="inline-block mr-1" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`transition-colors ${
                  isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-black hover:text-primary-200'
                }`}
              >
                <User size={20} className="inline-block mr-1" />
                <span>Login</span>
              </Link>
            )}
            
            <Link 
              to="/search" 
              className={`transition-colors ${
                isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
              }`}
            >
              <Search size={20} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`transition-colors ${
                  isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/recipes" 
                className={`transition-colors ${
                  isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                }`}
              >
                Recipes
              </Link>
              <Link 
                to="/categories" 
                className={`transition-colors ${
                  isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                }`}
              >
                Categories
              </Link>
              <Link 
                to="/search" 
                className={`transition-colors ${
                  isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                }`}
              >
                Search
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/favorites" 
                    className={`transition-colors ${
                      isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                    }`}
                  >
                    <Heart size={20} className="inline-block mr-2" />
                    Favorites
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`transition-colors ${
                      isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                    }`}
                  >
                    <User size={20} className="inline-block mr-2" />
                    Profile
                  </Link>
                  <button 
                    onClick={logout}
                    className={`transition-colors text-left ${
                      isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                    }`}
                  >
                    <LogOut size={20} className="inline-block mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className={`transition-colors ${
                    isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                  }`}
                >
                  <User size={20} className="inline-block mr-2" />
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

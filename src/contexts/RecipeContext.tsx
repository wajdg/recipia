import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Recipe, Category, SearchHistory, Comment, NutrientLog, RecipeContextType } from '../types';
import MOCK_RECIPES from '../data/mockRecipes';
import MOCK_CATEGORIES from '../data/mockCategories';
import MOCK_COMMENTS from '../data/mockComments';
import MOCK_NUTRIENT_DATA from '../data/mockNutrientData';
import { useAuth } from './AuthContext';

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [categories] = useState<Category[]>(MOCK_CATEGORIES);
  const [recentSearches, setRecentSearches] = useState<SearchHistory[]>([]);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [nutrientData, setNutrientData] = useState<NutrientLog[]>(MOCK_NUTRIENT_DATA);

  // Load favorites from localStorage on initial load
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites-${user.id}`);
      if (storedFavorites) {
        try {
          const favoriteIds = JSON.parse(storedFavorites) as string[];
          const favRecipes = recipes.filter(recipe => favoriteIds.includes(recipe.id));
          setFavoriteRecipes(favRecipes);
        } catch (error) {
          console.error('Failed to parse stored favorites:', error);
          localStorage.removeItem(`favorites-${user.id}`);
        }
      }

      const storedSearches = localStorage.getItem(`searches-${user.id}`);
      if (storedSearches) {
        try {
          const searches = JSON.parse(storedSearches) as SearchHistory[];
          setRecentSearches(searches);
        } catch (error) {
          console.error('Failed to parse stored searches:', error);
          localStorage.removeItem(`searches-${user.id}`);
        }
      }
    } else {
      // Clear favorites and searches when user logs out
      setFavoriteRecipes([]);
      setRecentSearches([]);
    }
  }, [user, recipes]);

  const searchRecipes = (query: string, filters?: string[]): void => {
    const queryLower = query.toLowerCase();
    
    let results = recipes.filter(recipe => {
      // Search in title, description, and ingredients
      const titleMatch = recipe.title.toLowerCase().includes(queryLower);
      const descMatch = recipe.description.toLowerCase().includes(queryLower);
      const ingredientMatch = recipe.ingredients.some(ing => 
        ing.name.toLowerCase().includes(queryLower)
      );
      
      return titleMatch || descMatch || ingredientMatch;
    });
    
    // Apply category filters if provided
    if (filters && filters.length > 0) {
      results = results.filter(recipe => {
        return filters.some(filter => recipe.categories.includes(filter));
      });
    }
    
    setSearchResults(results);
    
    // Add search to history if user is logged in
    if (user) {
      const newSearch: SearchHistory = {
        id: `${Date.now()}`,
        userId: user.id,
        query,
        createdAt: new Date()
      };
      
      // Add to start of array, limit to 10 recent searches
      const updatedSearches = [newSearch, ...recentSearches].slice(0, 10);
      setRecentSearches(updatedSearches);
      
      // Store in localStorage
      localStorage.setItem(`searches-${user.id}`, JSON.stringify(updatedSearches));
    }
  };

  const toggleFavorite = (recipeId: string): void => {
    if (!user) return;
    
    const isFav = favoriteRecipes.some(recipe => recipe.id === recipeId);
    
    let updatedFavorites: Recipe[];
    
    if (isFav) {
      // Remove from favorites
      updatedFavorites = favoriteRecipes.filter(recipe => recipe.id !== recipeId);
    } else {
      // Add to favorites
      const recipeToAdd = recipes.find(recipe => recipe.id === recipeId);
      if (recipeToAdd) {
        updatedFavorites = [...favoriteRecipes, recipeToAdd];
      } else {
        return; // Recipe not found
      }
    }
    
    setFavoriteRecipes(updatedFavorites);
    
    // Store favorite IDs in localStorage
    const favoriteIds = updatedFavorites.map(recipe => recipe.id);
    localStorage.setItem(`favorites-${user.id}`, JSON.stringify(favoriteIds));
  };

  const isFavorite = (recipeId: string): boolean => {
    return favoriteRecipes.some(recipe => recipe.id === recipeId);
  };

  const getRecipeById = (id: string): Recipe | undefined => {
    return recipes.find(recipe => recipe.id === id);
  };

  const addComment = async (recipeId: string, content: string): Promise<void> => {
    if (!user) throw new Error('User must be logged in to comment');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      recipeId,
      userId: user.id,
      username: user.username,
      profilePicture: user.profilePicture,
      content,
      createdAt: new Date()
    };
    
    setComments([newComment, ...comments]);
  };

  const getComments = (recipeId: string): Comment[] => {
    return comments.filter(comment => comment.recipeId === recipeId);
  };

  const markAsPrepared = async (recipeId: string, servings: number): Promise<void> => {
    if (!user) throw new Error('User must be logged in to mark recipes as prepared');
    
    try {
      const recipe = recipes.find(r => r.id === recipeId);
      if (!recipe) throw new Error('Recipe not found');

      // Calculate nutrients based on servings
      const date = new Date().toISOString().split('T')[0];
      const newNutrientLog: NutrientLog = {
        date,
        calories: recipe.calories * servings,
        protein: recipe.protein * servings,
        carbs: recipe.carbs * servings,
        fat: recipe.fat * servings
      };

      // Update nutrient data
      setNutrientData(prev => {
        const existingLog = prev.find(log => log.date === date);
        if (existingLog) {
          return prev.map(log => 
            log.date === date
              ? {
                  ...log,
                  calories: log.calories + newNutrientLog.calories,
                  protein: log.protein + newNutrientLog.protein,
                  carbs: log.carbs + newNutrientLog.carbs,
                  fat: log.fat + newNutrientLog.fat
                }
              : log
          );
        }
        return [...prev, newNutrientLog];
      });

    } catch (error) {
      console.error('Failed to mark recipe as prepared:', error);
      throw error;
    }
  };

  const value: RecipeContextType = {
    recipes,
    favoriteRecipes,
    searchResults,
    categories,
    recentSearches,
    nutrientData,
    searchRecipes,
    toggleFavorite,
    isFavorite,
    getRecipeById,
    addComment,
    getComments,
    markAsPrepared
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};

export const useRecipes = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import SearchBar from '../components/search/SearchBar';
import FilterOptions from '../components/search/FilterOptions';
import RecipeList from '../components/recipes/RecipeList';

const Search: React.FC = () => {
  const location = useLocation();
  const { categories, searchRecipes, searchResults } = useRecipes();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Parse query from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    
    if (query) {
      searchRecipes(query);
      setHasSearched(true);
    }
  }, [location.search, searchRecipes]);
  
  // Apply filters when they change
  useEffect(() => {
    if (hasSearched) {
      // Re-search with the same query but applying new filters
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('q') || '';
      
      if (query) {
        searchRecipes(query, selectedFilters);
      }
    }
  }, [selectedFilters, hasSearched, searchRecipes, location.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Find Your Perfect Recipe</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Search by recipe name, ingredients, or browse by category to discover your next meal inspiration.
        </p>
        <SearchBar />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="md:col-span-1">
          <FilterOptions 
            categories={categories}
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />
        </div>
        
        {/* Results */}
        <div className="md:col-span-3">
          {hasSearched ? (
            <RecipeList 
              recipes={searchResults} 
              title={`Search Results (${searchResults.length})`}
              emptyMessage="No recipes found matching your search criteria. Try adjusting your filters or search terms."
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Enter a search term above to find recipes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
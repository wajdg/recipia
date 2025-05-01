import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRecipes } from '../../contexts/RecipeContext';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchRecipes } = useRecipes();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchRecipes(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl mx-auto"
    >
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="input pl-10"
          placeholder="Search recipes, ingredients, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary ml-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
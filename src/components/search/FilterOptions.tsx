import React from 'react';
import { Category } from '../../types';

interface FilterOptionsProps {
  categories: Category[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ 
  categories, 
  selectedFilters, 
  onFilterChange 
}) => {
  const handleCategoryChange = (categoryName: string) => {
    if (selectedFilters.includes(categoryName)) {
      onFilterChange(selectedFilters.filter(filter => filter !== categoryName));
    } else {
      onFilterChange([...selectedFilters, categoryName]);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-medium text-lg mb-3">Filter By:</h3>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedFilters.includes(category.name)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
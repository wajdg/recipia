import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/categories/${category.name.toLowerCase()}`}
      className="block group"
    >
      <div className="relative h-48 overflow-hidden rounded-xl">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h3 className="text-xl font-medium mb-1">{category.name}</h3>
            <p className="text-sm text-white/80 line-clamp-2">
              {category.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
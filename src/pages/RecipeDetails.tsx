import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetail from '../components/recipes/RecipeDetail';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <RecipeDetail />
    </div>
  );
};

export default RecipeDetails;
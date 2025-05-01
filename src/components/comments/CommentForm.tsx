import React, { useState } from 'react';
import { useRecipes } from '../../contexts/RecipeContext';

interface CommentFormProps {
  recipeId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ recipeId }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = useRecipes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await addComment(recipeId, comment);
      setComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Add a comment
        </label>
        <textarea
          id="comment"
          rows={4}
          className="input"
          placeholder="Share your experience with this recipe..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
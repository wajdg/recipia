import React from 'react';
import { Comment } from '../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              {comment.profilePicture ? (
                <img 
                  src={comment.profilePicture} 
                  alt={comment.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-700 font-medium">
                  {comment.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h4 className="font-medium text-gray-900">{comment.username}</h4>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(comment.createdAt)}
              </span>
            </div>
            <div className="text-gray-700">
              {comment.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
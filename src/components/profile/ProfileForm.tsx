import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileFormProps {
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onCancel }) => {
  const { user, updateProfile } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<User>>({
    defaultValues: {
      username: user?.username,
      profilePicture: user?.profilePicture
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const onSubmit = async (data: Partial<User>) => {
    setIsLoading(true);
    setUpdateError(null);
    
    try {
      await updateProfile(data);
      onCancel(); // Close form after successful update
    } catch (error: any) {
      setUpdateError(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      
      {updateError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {updateError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            className={`input ${errors.username ? 'border-red-500' : ''}`}
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters'
              }
            })}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture URL
          </label>
          <input
            id="profilePicture"
            type="text"
            className="input"
            placeholder="https://example.com/image.jpg"
            {...register('profilePicture')}
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter a URL to an image. Leave blank to use default.
          </p>
        </div>
        
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
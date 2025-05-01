import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserCredentials } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserCredentials>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: UserCredentials) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      setLoginError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
      
      {loginError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {loginError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`input ${errors.email ? 'border-red-500' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`input ${errors.password ? 'border-red-500' : ''}`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-2.5 text-center"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
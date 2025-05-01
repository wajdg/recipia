import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SignupForm from '../components/auth/SignupForm';

const Signup: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
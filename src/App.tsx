import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RecipeProvider } from './contexts/RecipeContext';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RecipeProvider>
          <Router />
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
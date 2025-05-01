export interface User {
  id: string;
  email: string;
  username: string;
  profilePicture?: string;
  createdAt: Date;
  preparedRecipes?: PreparedRecipe[];
}

export interface PreparedRecipe {
  id: string;
  recipeId: string;
  userId: string;
  date: string;
  servings: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookTime: number;
  prepTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  categories: string[];
  author: {
    id: string;
    username: string;
  };
  createdAt: Date;
  rating: number;
  reviewCount: number;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Comment {
  id: string;
  recipeId: string;
  userId: string;
  username: string;
  profilePicture?: string;
  content: string;
  createdAt: Date;
}

export interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface NutrientLog {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FavoriteRecipe {
  userId: string;
  recipeId: string;
  createdAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends UserCredentials {
  username: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: UserCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export interface RecipeContextType {
  recipes: Recipe[];
  favoriteRecipes: Recipe[];
  searchResults: Recipe[];
  categories: Category[];
  recentSearches: SearchHistory[];
  nutrientData: NutrientLog[];
  searchRecipes: (query: string, filters?: string[]) => void;
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  getRecipeById: (id: string) => Recipe | undefined;
  addComment: (recipeId: string, content: string) => Promise<void>;
  getComments: (recipeId: string) => Comment[];
  markAsPrepared: (recipeId: string, servings: number) => Promise<void>;
}
import { useState,useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('netflix-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Simulate API call - In real app, you'd call your backend
      if (email && password) {
        const userData = {
          id: Date.now(),
          email: email,
          name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=E50914&color=fff`
        };
        
        setUser(userData);
        localStorage.setItem('netflix-user', JSON.stringify(userData));
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (email, password, name) => {
    try {
      // Simulate API call
      if (email && password && name) {
        const userData = {
          id: Date.now(),
          email: email,
          name: name,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=E50914&color=fff`
        };
        
        setUser(userData);
        localStorage.setItem('netflix-user', JSON.stringify(userData));
        return { success: true };
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('netflix-user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("netflix-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      if (email && password) {
        const userData = {
          id: Date.now(),
          email: email,
          name: email.split("@")[0],
          avatar: `https://ui-avatars.com/api/?name=${
            email.split("@")[0]
          }&background=E50914&color=fff`,
        };

        setUser(userData);
        localStorage.setItem("netflix-user", JSON.stringify(userData));
        return { success: true };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, name) => {
    try {
      if (email && password && name) {
        const userData = {
          id: Date.now(),
          email: email,
          name: name,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=E50914&color=fff`,
        };

        setUser(userData);
        localStorage.setItem("netflix-user", JSON.stringify(userData));
        return { success: true };
      } else {
        throw new Error("All fields are required");
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };


  const value = {
    user,
    login,
    register, 
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

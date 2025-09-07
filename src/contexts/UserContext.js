import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize user state on app load
  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      if (authAPI.isAuthenticated()) {
        // Verify token and get user data
        const response = await authAPI.verify();
        if (response.valid) {
          setUser(response.user);
          setIsAuthenticated(true);
          
          // Load user preferences
          try {
            const profileData = await userAPI.getProfile();
            setUserPreferences(profileData.preferences);
          } catch (error) {
            console.warn('Failed to load user preferences:', error);
          }
        } else {
          // Token invalid, clear local storage
          await logout();
        }
      }
    } catch (error) {
      console.warn('User initialization failed:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData, password) => {
    try {
      const response = await authAPI.login(loginData, password);
      setUser(response.user);
      setIsAuthenticated(true);
      
      // Load user preferences
      try {
        const profileData = await userAPI.getProfile();
        setUserPreferences(profileData.preferences);
      } catch (error) {
        console.warn('Failed to load user preferences after login:', error);
      }
      
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      
      // User preferences are created automatically on registration
      // Load them
      try {
        const profileData = await userAPI.getProfile();
        setUserPreferences(profileData.preferences);
      } catch (error) {
        console.warn('Failed to load user preferences after registration:', error);
      }
      
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      setUser(null);
      setUserPreferences(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      await userAPI.updateProfile(profileData);
      
      // Update local user state
      setUser(prev => ({
        ...prev,
        ...profileData
      }));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Profile update failed' };
    }
  };

  const updatePreferences = async (preferences) => {
    try {
      await userAPI.updatePreferences(preferences);
      
      // Update local preferences state
      setUserPreferences(prev => ({
        ...prev,
        ...preferences
      }));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Preferences update failed' };
    }
  };

  const getUserStats = async () => {
    try {
      const stats = await userAPI.getStats();
      return { success: true, stats };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to get user stats' };
    }
  };

  const value = {
    // State
    user,
    userPreferences,
    isAuthenticated,
    loading,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
    getUserStats,
    
    // Helpers
    isAdmin: user?.role === 'admin',
    userName: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.username,
    userInitials: user?.firstName ? 
      `${user.firstName[0]}${user.lastName?.[0] || ''}`.toUpperCase() : 
      user?.username?.substring(0, 2).toUpperCase()
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
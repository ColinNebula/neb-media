import axios from 'axios';
import { getApiUrl, isValidToken, secureStorage } from '../config/security';

const API_BASE_URL = getApiUrl();

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = secureStorage.getItem('authToken');
  if (token && isValidToken(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid
      secureStorage.removeItem('authToken');
      secureStorage.removeItem('user');
      // Optionally redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      secureStorage.setItem('authToken', response.data.token);
      secureStorage.setItem('user', response.data.user);
    }
    return response.data;
  },

  // Login user
  login: async (login, password) => {
    const response = await api.post('/auth/login', { login, password });
    if (response.data.token) {
      secureStorage.setItem('authToken', response.data.token);
      secureStorage.setItem('user', response.data.user);
    }
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      secureStorage.removeItem('authToken');
      secureStorage.removeItem('user');
    }
  },

  // Verify token
  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    return secureStorage.getItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = secureStorage.getItem('authToken');
    return token && isValidToken(token);
  }
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },

  // Get user statistics
  getStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  }
};

// Video API
export const videoAPI = {
  // Add video to collection
  addVideo: async (videoData) => {
    const response = await api.post('/videos', videoData);
    return response.data;
  },

  // Get user's videos
  getVideos: async (params = {}) => {
    const response = await api.get('/videos', { params });
    return response.data;
  },

  // Update video progress/status
  updateVideo: async (videoId, updateData) => {
    const response = await api.put(`/videos/${videoId}`, updateData);
    return response.data;
  },

  // Delete video from collection
  deleteVideo: async (videoId) => {
    const response = await api.delete(`/videos/${videoId}`);
    return response.data;
  },

  // Track video analytics
  trackAnalytics: async (analyticsData) => {
    const response = await api.post('/videos/analytics', analyticsData);
    return response.data;
  }
};

// Playlist API
export const playlistAPI = {
  // Create new playlist
  createPlaylist: async (playlistData) => {
    const response = await api.post('/playlists', playlistData);
    return response.data;
  },

  // Get user's playlists
  getPlaylists: async (params = {}) => {
    const response = await api.get('/playlists', { params });
    return response.data;
  },

  // Get specific playlist with videos
  getPlaylist: async (playlistId) => {
    const response = await api.get(`/playlists/${playlistId}`);
    return response.data;
  },

  // Update playlist
  updatePlaylist: async (playlistId, updateData) => {
    const response = await api.put(`/playlists/${playlistId}`, updateData);
    return response.data;
  },

  // Delete playlist
  deletePlaylist: async (playlistId) => {
    const response = await api.delete(`/playlists/${playlistId}`);
    return response.data;
  },

  // Add video to playlist
  addVideoToPlaylist: async (playlistId, videoId, position) => {
    const response = await api.post(`/playlists/${playlistId}/videos`, {
      videoId,
      position
    });
    return response.data;
  },

  // Remove video from playlist
  removeVideoFromPlaylist: async (playlistId, videoId) => {
    const response = await api.delete(`/playlists/${playlistId}/videos/${videoId}`);
    return response.data;
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

// Helper functions
export const apiHelpers = {
  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.data?.error || 'An error occurred';
      return { success: false, message, status: error.response.status };
    } else if (error.request) {
      // Network error
      return { success: false, message: 'Network error. Please check your connection.', status: 0 };
    } else {
      // Other error
      return { success: false, message: error.message || 'An unexpected error occurred', status: -1 };
    }
  },

  // Format video data for API
  formatVideoData: (videoUrl, title, platform, description = '', duration = 0, thumbnailUrl = '') => {
    return {
      videoUrl,
      videoTitle: title,
      videoDescription: description,
      platform,
      duration,
      thumbnailUrl
    };
  },

  // Extract platform from URL
  detectPlatform: (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('vimeo.com')) return 'Vimeo';
    if (url.includes('twitch.tv')) return 'Twitch';
    if (url.includes('dailymotion.com')) return 'Dailymotion';
    if (url.includes('wistia.com')) return 'Wistia';
    return 'Direct';
  }
};

export default api;
# NEB Media Backend API

This is the backend API server for the NEB Media video player application, built with Node.js, Express, and MySQL.

## Features

- 🔐 **User Authentication** - JWT-based authentication with secure password hashing
- 👤 **User Management** - Profile management and preferences
- 🎥 **Video Management** - Save, organize, and track video progress
- 📋 **Playlists** - Create and manage custom video playlists
- 📊 **Analytics** - Track video viewing patterns and statistics
- 🔒 **Security** - Rate limiting, CORS, and input validation
- 🗄️ **Database** - MySQL with optimized schema and indexes

## Prerequisites

- Node.js (>= 16.0.0)
- MySQL (>= 8.0)
- npm or yarn

## Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Copy the `.env` file and update with your settings:

```bash
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=neb_media_db
DB_PORT=3306

# JWT Secret (CHANGE THIS!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3002
```

### 3. Setup MySQL Database

Make sure MySQL is running, then initialize the database:

```bash
npm run init-db
```

This will:
- Create the `neb_media_db` database
- Create all necessary tables with proper indexes
- Set up the complete schema

### 4. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/preferences` - Update user preferences
- `GET /api/users/stats` - Get user statistics

### Videos
- `POST /api/videos` - Add video to collection
- `GET /api/videos` - Get user's videos (with filtering/pagination)
- `PUT /api/videos/:videoId` - Update video progress/status
- `DELETE /api/videos/:videoId` - Remove video from collection
- `POST /api/videos/analytics` - Track video analytics

### Playlists
- `POST /api/playlists` - Create new playlist
- `GET /api/playlists` - Get user's playlists
- `GET /api/playlists/:playlistId` - Get specific playlist with videos
- `PUT /api/playlists/:playlistId` - Update playlist
- `DELETE /api/playlists/:playlistId` - Delete playlist
- `POST /api/playlists/:playlistId/videos` - Add video to playlist
- `DELETE /api/playlists/:playlistId/videos/:videoId` - Remove video from playlist

### Health Check
- `GET /health` - API health status

## Database Schema

### Tables
- **users** - User accounts and profiles
- **user_preferences** - User settings and preferences
- **user_videos** - User's video collection with watch progress
- **user_playlists** - Custom video playlists
- **playlist_videos** - Many-to-many relationship for playlist contents
- **user_sessions** - JWT token session management
- **video_analytics** - Video viewing analytics and tracking

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration
- SQL injection prevention
- Helmet.js security headers

## Usage with React Frontend

The API is designed to work with your React video player app. Here's how to integrate:

### 1. Install Axios in your React app:
```bash
cd ../  # Go back to React app directory
npm install axios
```

### 2. Create an API service:
```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

export default api;
```

### 3. Use in your components:
```javascript
// Login example
const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { 
      login: email, 
      password 
    });
    localStorage.setItem('authToken', response.data.token);
    return response.data.user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Add video example
const addVideo = async (videoUrl, title, platform) => {
  try {
    const response = await api.post('/videos', {
      videoUrl,
      videoTitle: title,
      platform
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add video:', error);
    throw error;
  }
};
```

## Development

### Running Tests
```bash
npm test
```

### Database Reset
To reset the database (⚠️ This will delete all data):
```bash
npm run init-db
```

### Logs
The server logs important events including:
- Database connections
- Authentication attempts
- Error details (in development mode)
- API request information

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong, random `JWT_SECRET`
3. Configure proper MySQL credentials
4. Set up SSL/HTTPS
5. Configure firewall rules
6. Use a process manager like PM2
7. Set up monitoring and logging

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure the database user has proper permissions

### CORS Issues
- Update `FRONTEND_URL` in `.env` to match your React app URL
- Check that the frontend is running on the specified port

### JWT Issues
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration (default: 7 days)
- Verify tokens are being sent in Authorization header

## Support

For issues or questions:
1. Check the console logs for detailed error messages
2. Verify environment configuration
3. Ensure database schema is properly initialized
4. Check that all dependencies are installed correctly

---

🚀 **Your NEB Media API is ready to power your video player application!**
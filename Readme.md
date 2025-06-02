# Video Sharing Backend API

A full-featured backend REST API for a video sharing platform, built with **Node.js**, **Express**, and **MongoDB**.  
It supports user authentication, video uploads, playlists, tweets, likes, subscriptions, and more.

## Features

- **User Authentication**: Register, login, logout, JWT-based auth, password change, refresh tokens.
- **Video Management**: Upload, update, delete, fetch videos, toggle publish status, watch history.
- **Playlists**: Create, update, delete playlists, add/remove videos, fetch user playlists.
- **Tweets**: Post, update, delete tweets, fetch user tweets.
- **Likes**: Like/unlike videos, comments, tweets, fetch liked videos.
- **Subscriptions**: Subscribe/unsubscribe to channels, fetch subscribers and subscribed channels.
- **Cloudinary Integration**: For storing user avatars, cover images, video files, and thumbnails.
- **Multer**: For handling file uploads.
- **Robust Error Handling**: Consistent API error and response structure.
- **Healthcheck Endpoint**: For monitoring API status.

## Tech Stack

- **Node.js** (ES Modules)
- **Express.js**
- **MongoDB** with **Mongoose**
- **Cloudinary** (media storage)
- **JWT** (authentication)
- **Multer** (file uploads)
- **dotenv** (environment variables)
- **cookie-parser**, **cors**

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=8000
MONGODB_URI=<your-mongodb-uri>
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=<your-access-token-secret>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

### 4. Start the server

```bash
npm run dev
```

The server will run at [http://localhost:8000](http://localhost:8000).

## API Endpoints

### Auth & User

- `POST /api/v1/users/register` — Register a new user (with avatar & cover image)
- `POST /api/v1/users/login` — Login
- `POST /api/v1/users/logout` — Logout
- `POST /api/v1/users/refresh-token` — Refresh access token
- `POST /api/v1/users/change-password` — Change password
- `GET /api/v1/users/current-user` — Get current user profile
- `PATCH /api/v1/users/update-account` — Update user details
- `PATCH /api/v1/users/avatar` — Update avatar
- `PATCH /api/v1/users/cover-image` — Update cover image
- `GET /api/v1/users/c/:username` — Get user channel profile
- `GET /api/v1/users/history` — Get watch history

### Videos

- `POST /api/v1/videos/` — Upload a video
- `GET /api/v1/videos/` — Get all videos (with query, sort, pagination)
- `GET /api/v1/videos/:videoId` — Get video by ID
- `PATCH /api/v1/videos/:videoId` — Update video details
- `DELETE /api/v1/videos/:videoId` — Delete video
- `PATCH /api/v1/videos/:videoId/toggle-publish` — Toggle publish status

### Playlists

- `POST /api/v1/playlists/` — Create playlist
- `GET /api/v1/playlists/user/:userId` — Get user playlists
- `PATCH /api/v1/playlists/:playlistId` — Update playlist
- `DELETE /api/v1/playlists/:playlistId` — Delete playlist
- `POST /api/v1/playlists/:playlistId/videos/:videoId` — Add video to playlist

### Tweets

- `POST /api/v1/tweets/` — Create tweet
- `GET /api/v1/tweets/user/:userId` — Get user tweets
- `PATCH /api/v1/tweets/:tweetId` — Update tweet
- `DELETE /api/v1/tweets/:tweetId` — Delete tweet

### Likes

- `POST /api/v1/likes/video/:videoId` — Like/unlike a video
- `POST /api/v1/likes/comment/:commentId` — Like/unlike a comment
- `POST /api/v1/likes/tweet/:tweetId` — Like/unlike a tweet
- `GET /api/v1/likes/videos` — Get liked videos

### Subscriptions

- `POST /api/v1/subscriptions/:channelId` — Subscribe/unsubscribe to a channel
- `GET /api/v1/subscriptions/channel/:channelId` — Get channel subscribers
- `GET /api/v1/subscriptions/user/:subscriberId` — Get channels a user is subscribed to

### Healthcheck

- `GET /api/v1/healthcheck` — Check API status

## Folder Structure

```
src/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  app.js
  index.js
public/
.env
```

## Note
Based on backend series by https://github.com/hiteshchoudhary
## License

[ISC](LICENSE)

## Author

Yash

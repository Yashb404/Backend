# YouTube Clone Backend

This is a backend implementation of a YouTube-like video platform, built using Node.js, Express.js, and MongoDB. It is based on the backend series by Hitesh Choudhary.

## Features

- User authentication using JWT
- Video upload and management
- Like and dislike functionality
- Comment system
- Channel subscription system
- Watch history tracking
- Search and filtering

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- Multer for file uploads
- dotenv for environment variable management

## Project Structure

```
src/
├── controllers/       # Route handlers
├── models/            # Mongoose schemas
├── routes/            # API endpoints
├── middleware/        # Authentication and error handling
├── utils/             # Utility functions
├── app.js             # Express app setup
public/                # Static assets (if any)
.env                   # Environment variables
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Yashb404/Youtube-clone-Backend-project.git
   cd Youtube-clone-Backend-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

## API Overview

### Auth

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive a JWT

### Videos

- `POST /api/videos` – Upload a new video
- `GET /api/videos/:id` – Get video details
- `DELETE /api/videos/:id` – Delete a video

### Comments

- `POST /api/comments/:videoId` – Add a comment
- `GET /api/comments/:videoId` – Get comments for a video

### Interactions

- `POST /api/videos/:id/like` – Like a video
- `POST /api/videos/:id/dislike` – Dislike a video
- `POST /api/users/:id/subscribe` – Subscribe to a channel
- `POST /api/users/:id/unsubscribe` – Unsubscribe from a channel

## Notes

 based on the backend tutorial series by Hitesh Choudhary.

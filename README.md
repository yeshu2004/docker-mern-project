# Dockerized MERN Stack Project

A simple Docker Compose setup for a MERN (MongoDB, Express.js, React, Node.js) stack application. This project demonstrates containerization of a full-stack web app using Docker and Docker Compose. It's designed as an educational foundation for learning how to upload, build, and communicate between services in a Dockerized environment.

The app includes:
- **Frontend**: A basic React app with React Router for navigation.
- **Backend**: A Node.js/Express server handling simple CRUD operations (GET/POST requests) connected to MongoDB.
- **Database**: MongoDB for persistent data storage.

This setup is perfect for beginners to understand Docker workflows, inter-service communication, and scaling to larger projects.

## Features
- Containerized frontend, backend, and database services.
- Simple API endpoints for GET (fetch data) and POST (create data) operations.
- Volume mounting for development (hot-reloading on backend).
- Nginx for serving the built React app in production mode.
- Bridge network for secure inter-container communication.

## Tech Stack
- **Frontend**: React.js, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
- **Other**: Nginx (for frontend serving)

## Folder Structure
```
docker-mern-project/
├── client/                 # React frontend
│   ├── Dockerfile          # Multi-stage build for React app
│   ├── package.json        # Frontend dependencies
│   ├── src/                # React source code
│   └── ...                 # Other frontend files
├── server/                 # Node.js/Express backend
│   ├── Dockerfile          # Backend Docker build
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Entry point (assumed)
│   └── ...                 # API routes and models
├── docker-compose.yml      # Orchestrates services (root level)
└── README.md               # This file
```

## Prerequisites
- Docker installed on your machine ([Download here](https://www.docker.com/products/docker-desktop/)).
- Docker Compose (included with Docker Desktop).
- Git for cloning the repo.
- Node.js (optional, for local dev without Docker).

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yeshu2004/docker-mern-project.git
   cd docker-mern-project
   ```

2. **Build and Start Services**:
   Run the following command in the root directory to build images and start all services:
   ```bash
   docker-compose up --build
   ```
   - This will:
     - Build the backend image from `./server/Dockerfile`.
     - Build the frontend image from `./client/Dockerfile` (multi-stage: build React, serve with Nginx).
     - Pull and run MongoDB.
   - Services will start in detached mode if you add `-d` flag.

3. **Access the Application**:
   - **Frontend**: Open [http://localhost:8080](http://localhost:8080) in your browser.
   - **Backend API**: Test at [http://localhost:5000](http://localhost:5000) (e.g., via Postman).
   - **MongoDB**: Connect to [mongodb://localhost:27017/dockerDB](mongodb://localhost:27017/dockerDB).

4. **Stop Services**:
   ```bash
   docker-compose down
   ```
   - Add `-v` to remove volumes (e.g., clear MongoDB data).

5. **View Logs**:
   ```bash
   docker-compose logs -f [service-name]  # e.g., backend, frontend, mongo
   ```

## API Endpoints
The backend exposes simple RESTful endpoints for learning Docker communication. Assuming a basic `/api/items` route for a to-do like app:

| Method | Endpoint              | Description                  | 
|--------|-----------------------|------------------------------|
| GET    | `/api`                | GET dummy message          |                   |
| POST   | `/api/msg`            | POST req            |

- **Example GET Request** (using curl):
  ```bash
  curl http://localhost:5000/api/
  ```

- **Example POST Request**:
  ```bash
  curl -X POST http://localhost:5000/api/msg \
    -H "Content-Type: application/json" \
   -d '{"message":"Hello Backend!"}'
  ```
  
  <img width="1467" height="688" alt="Screenshot 2025-11-05 001334" src="https://github.com/user-attachments/assets/283d822f-87db-4ebb-aa54-a112e7d854e2" />
  
The frontend (React app) consumes these endpoints via fetch for displaying and adding items.

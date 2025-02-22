# Note Management Backend

This is a **Note Management API** backend built using **Node.js, Express, and MongoDB** with **TypeScript**. The project follows best practices for **scalability**, includes **tests**, uses **REST**, **JWT authentication** and **LLM Models Integration**.

> **💻 This project has a front-end 💻**
>
> https://github.com/camilabbreda/Note-Management-Frontend

# Table of Contents

- [Note Management Backend](#note-management-backend)
- [📌 Features](#-features)
- [🏗 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Pre Installation](#pre-installation)
    - [Ollama](#ollama)
  - [Installation](#installation)
    - [Clone the repo](#clone-the-repo)
    - [Install dependencies](#install-dependencies)
  - [Environment Variables](#environment-variables)
- [🔥 Running the Application](#-running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [🧪 Running Tests](#-running-tests)
- [📜 API Endpoints](#-api-endpoints)
  - [User Routes](#user-routes)
  - [Note Routes](#note-routes)
  - [LLM Generate Routes](#llm-generate-routes)
- [📝 License](#-license)

## 📌 Features

- ✨ **AI Notes Title Suggestions** ✨To enhance the functionality of Note Management APP, we have integrated an AI language model using Ollama to suggest titles for user notes based on the note content. [experimental]

- 🔑 **User authentication** - Register, Login, JWT-based authentication
- 🔍 **CRUD operations for users and users notes** Create, Read, Update, Delete
- 🛠️ **Tests** using Jest & Supertest
- 🌍 **Scalable architecture**

## 🏗 Project Structure

```
📂src/
├── 📂common/             # Shared utilities and data structures
│   ├── dtos/             # Data Transfer Objects (DTOs) for structured responses
│   ├── error/            # Custom error handling and exceptions
│   ├── interface/        # Interfaces defining core data models
│   └── util/             # Utility functions and authentication logic
│       ├── auth/         # Authentication middleware and helper functions
│       └── function/     # Common utility functions (e.g., validation, formatting)
│
├── 📂domain/             # Core application logic
│   ├── controller/       # Handles HTTP requests and responses
│   ├── repository/       # Data access layer for MongoDB operations
│   └── service/          # Business logic and service layer
│
├── 📂infrastructure/     # Framework and external service integration
│   ├── database/         # Database connection and configuration
│   ├── model/            # MongoDB schemas and models
│   └── routes.ts         # API route definitions
│
└── server.ts             # Application entry point

📂tests/                  # Unit and integration tests
├── routes/               # Tests for API routes and endpoints
├── setupTest/            # Test environment setup
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

[Node.js](https://nodejs.org/) (v22+ recommended)

[MongoDB](https://www.mongodb.com/) - Running locally or using a cloud database like MongoDB Atlas

[Ollama](https://ollama.com/) - Best to use lightweight and fast LLMs.

### Pre Installation

#### Ollama

1. Download and Install [Ollama](https://ollama.com/)
2. Pull a lightweight model:
   `smollm2:latest` with 270Mb for example

   ```sh
   ollama pull smollm2:latest
   ```

3. Check if Ollama server is running, if not, then start it:

   ```sh
   ollama serve
   ```

4. Add the envs to the `.env`

   OLLAMA_HOST = 'http://127.0.0.1:11434' \
   LLM_MODEL_NAME = 'smollm2:latest'

### Installation

Clone the repository and install dependencies

#### Clone the repo

```sh
git clone https://github.com/camilabbreda/Note-Management-Backend.git

cd Note-Management-Backend
```

#### Install dependencies

```sh
npm install
```

### Environment Variables

Create a .env file in the root directory and add the following variables:

```env
PORT_SERVER=4000 #(Optional)\
JWT_SECRET=JWT_SECRET_KEY\
MONGO_URI=mongodb://localhost:27017/note-app\
OLLAMA_HOST = 'http://127.0.0.1:11434' \
LLM_MODEL_NAME = 'smollm2:latest'
```

## 🔥 Running the Application

### Development Mode

```sh
npm run dev
```

This starts the server using nodemon for live reloading.

### Production Mode

```sh
npm run build

node dist/server.js
```

## 🧪 Running Tests

Tests are written using **Jest** and **Supertest**.

```sh
npm test
```

## 📜 API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | /health  | Healthcheck |

### User Routes

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | /user/register          | Register a new user |
| POST   | /user/login             | Login a user        |
| GET    | /user                   | Get all users       |
| GET    | /user/{userId}          | Get user by ID      |
| PUT    | /user/register/{userId} | Update user details |
| DELETE | /user/register/{userId} | Delete a user       |

### Note Routes

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | /note/user/{userId} | Get notes by user ID |
| GET    | /note               | Get all notes        |
| GET    | /note/{noteId}      | Get note by ID       |
| POST   | /note               | Create a new note    |
| PUT    | /note/{noteId}      | Update a note        |
| DELETE | /note/{noteId}      | Delete a note        |

### LLM Generate Routes

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | /generate/note-title | Generate a note title suggestion |

> **Tip**
> Refer to the tests to see endpoints details.

ENJOY THE APP!

## 📝 License

This project is licensed under the **MIT License**.

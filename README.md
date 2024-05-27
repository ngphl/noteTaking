# Note Taking Application

## Purpose of the Application

This Note Taking application is designed to help users create, read, update, and delete notes. It features user authentication to ensure that each user's notes are private and secure. The application is divided into two parts: a backend server and a frontend client. The backend is built with Node.js, Express, and Knex, while the frontend is built with React Native.

## Features

- User Authentication (Register, Login)
- Create, Read, Update, Delete (CRUD) notes
- Secure storage of notes per user
- Responsive design for mobile use (React Native)

## Architecture

The application is divided into two main parts:

1. **Backend**: Handles API requests, authentication, and database operations.
    - **Technologies**: Node.js, Express, Knex, SQLite3, JWT, bcryptjs
    - **Structure**:
        - `controllers`: Handles the logic for each API endpoint.
        - `middleware`: Contains the authentication middleware.
        - `routes`: Defines the API routes.
        - `config`: Contains database configuration.
        - `migrations`: Database migration files.
        - `seeds`: Seed files to populate the database with initial data.
        - `.env`: Environment variables for sensitive information (ignored by git).
    
2. **Frontend**: Provides a user interface for interacting with the application.
    - **Technologies**: React Native
    - **Structure**:
        - `components`: Reusable UI components.
        - `screens`: Different screens/views of the application.
        - `service`: Contains service files for API interactions.
        - `navigation`: Contains navigation configurations.
        - `assets`: Contains images and other static assets.
        - `styles`: Contains styling files.

## Installation

### Prerequisites

- Node.js and npm
- React Native CLI
- SQLite3 (for backend)

### Backend Setup

1. Clone the repository and navigate to the backend directory:
    ```sh
    git clone <repository_url>
    cd <repository_name>/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Setup environment variables:
    ```sh
    touch .env
    ```

    Add the following to `.env` file:
    ```env
    JWT_SECRET=your_jwt_secret
    ```

4. Run migrations and seed the database:
    ```sh
    npx knex migrate:latest
    npx knex seed:run
    ```

5. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the React Native application:
    ```sh
    npx react-native run-android # For Android
    npx react-native run-ios     # For iOS
    ```

## How to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

Please ensure your code follows the project's coding standards and includes appropriate comments.

## Reporting Issues

If you encounter any issues with the application, please report them via the [GitHub Issues](https://github.com/your-repo/issues) page. Provide a detailed description of the issue and steps to reproduce it.

## Dependencies

### Backend

- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `knex`: SQL query builder for Node.js
- `sqlite3`: SQLite3 bindings for Node.js
- `jsonwebtoken`: JSON Web Token implementation for Node.js
- `bcryptjs`: Library to help you hash passwords
- `dotenv`: Module to load environment variables from a .env file into `process.env`

### Frontend

- `react-native`: A framework for building native apps using React
- `react-navigation`: Routing and navigation for React Native apps
- `@react-native-async-storage/async-storage`: An asynchronous, persistent, key-value storage system for React Native
- `@react-navigation/native`: React Navigation native dependencies
- `@react-navigation/stack`: Stack navigator for React Navigation

## Comments in Code

The codebase is well-documented with comments explaining the functionality of different parts of the application. Ensure to maintain this level of documentation when contributing new features or making changes.

---

For any additional details or questions, feel free to reach out via the project's [GitHub repository](https://github.com/your-repo). 
Or simply send me an email at longsworkspace@gmail.com

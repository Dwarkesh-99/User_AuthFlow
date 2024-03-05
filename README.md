## User_AuthFlow
User_AuthFlow is a user authentication system built using Node.js, Express, MongoDB, and EJS. It provides functionalities for user signup, signin, password reset, and authentication using JWT tokens.

## Features
Signup: Users can create a new account by providing their email and password.
Signin: Registered users can sign in with their email and password.
Password Reset: Users can request a password reset if they forget their password.
Authentication: JWT tokens are used to authenticate users and provide secure access to protected routes.

## Technologies Used
Node.js: JavaScript runtime environment for server-side logic.
Express: Web application framework for Node.js to build robust APIs and web applications.
MongoDB: NoSQL database for storing user information securely.
EJS: Embedded JavaScript templates for rendering dynamic HTML pages.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Dwarkesh-99/User_AuthFlow.git
   ```

2. Navigate to the project directory:

   ```bash
   cd user_authflow
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost/user_authflow
   JWT_SECRET=your_secret_key
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Sign up for a new account by providing your email and password.
- Sign in with your registered email and password.
- Reset your password if you forget it.
- Access protected routes by authenticating with JWT tokens.

---

Feel free to customize the README file according to your project's specific requirements and additional features!

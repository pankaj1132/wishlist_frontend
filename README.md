# Wishlist App

A **MERN Stack** application that allows users to create, manage, and view their wishlists. The app supports user authentication, dark mode, and a responsive design.

---

## Features

- **User Authentication**: Sign up, sign in, and secure access to wishlists.
- **Wishlist Management**: Create, update, delete, and view wishlists with product details.
- **Dark Mode**: Toggle between light and dark themes for a better user experience.
- **Responsive Design**: Fully responsive UI for desktop and mobile devices.
- **Serverless Deployment**: Backend deployed on Vercel for scalability.

---

## Tech Stack

### Frontend:
- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Tailwind CSS**: For styling.
- **Axios**: For API requests.

### Backend:
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For database storage.
- **Mongoose**: For database modeling.
- **JWT**: For user authentication.

---

## Installation

### Prerequisites:
- Node.js installed on your system.
- MongoDB instance running locally or on the cloud.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wishlist-app.git
   cd wishlist-app
   ```

---

## Folder Structure and File Descriptions

### **Frontend**

#### 1. `src/App.jsx`
- The main entry point for the React application.
- Manages the routing for the app using `react-router-dom`.
- Passes the `isDarkTheme` and `toggleTheme` props to components for theme toggling.

#### 2. `Components/Navbar.jsx`
- Contains the navigation bar for the app.
- Displays links for navigation and a button to toggle between light and dark themes.
- Handles user logout functionality.

#### 3. `pages/Home.jsx`
- The landing page of the app.
- Provides links to the "Sign In" and "Sign Up" pages.
- Dynamically adapts to light or dark themes.

#### 4. `pages/SigninPage.jsx`
- Handles user sign-in functionality.
- Sends a POST request to the backend to authenticate the user.
- Stores the JWT token in `localStorage` upon successful login.
- Redirects the user to the appropriate page based on their wishlists.

#### 5. `pages/SignupPage.jsx`
- Handles user sign-up functionality.
- Sends a POST request to the backend to create a new user account.
- Redirects the user to the "Sign In" page upon successful registration.

#### 6. `pages/Wishlist.jsx`
- Allows users to create new wishlists or add products to existing ones.
- Sends POST and PUT requests to the backend to save or update wishlists.
- Dynamically adds or removes products from the wishlist form.

#### 7. `pages/ViewWishlist.jsx`
- Displays all wishlists created by the user.
- Allows users to edit or delete wishlists.
- Sends GET, PUT, and DELETE requests to the backend for fetching, updating, and deleting wishlists.

---

### **Backend**

#### 1. `server.js`
- The entry point for the backend server.
- Configures middleware, routes, and database connection.
- Starts the Express server.

#### 2. `routes/wishlist.js`
- Defines the API endpoints for wishlist-related operations.
- Includes routes for creating, fetching, updating, and deleting wishlists.
- Protected by authentication middleware.

#### 3. `controllers/wishlistController.js`
- Contains the logic for handling wishlist-related API requests.
- Functions include:
  - `createWishlist`: Creates a new wishlist.
  - `getWishlists`: Fetches all wishlists for the authenticated user.
  - `updateWishlist`: Updates an existing wishlist.
  - `deleteWishlist`: Deletes a wishlist.

#### 4. `middleware/authMiddleware.js`
- Middleware to protect routes by verifying the JWT token.
- Ensures only authenticated users can access certain endpoints.

#### 5. `models/Wishlist.js`
- Defines the Mongoose schema for wishlists.
- Includes fields for `name`, `products`, and `createdBy`.

---

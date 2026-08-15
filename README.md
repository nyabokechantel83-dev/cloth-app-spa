# JOVETA CLOTHLINE

A React-based Single Page Application (SPA) for browsing, displaying and managing clothing products.

The application allows users to browse products, search for products, view detailed product information, manage a shopping cart, and provides an admin interface for managing products.



# Project Overview

Joveta Clothline is an e-commerce clothing application developed using React.

The application demonstrates:

- React functional components
- React Hooks
- Custom Hooks
- React Router
- Context API
- REST API data fetching
- Search and filtering
- Component-based architecture
- Automated testing with Vitest and React Testing Library
- Git feature-branch workflow

The project uses `db.json` with JSON Server as the local REST API for product data.



# Technologies Used

- React
- Vite
- React Router DOM
- JavaScript
- Tailwind CSS
- JSON Server
- Vitest
- React Testing Library
- Git and GitHub



# Main Features

# Home Page

The home page introduces the Joveta Clothline application and provides navigation to the main sections of the application.

# Shop

The Shop page:

- Fetches products from the REST API
- Displays products
- Allows users to search for products
- Filters products based on the search term
- Displays loading states
- Displays error messages

# Product Details

Users can select a product and view:

- Product image
- Product name
- Product category
- Product price
- Product description

# Shopping Cart

Users can:

- View products added to the cart
- Adjust quantities
- Remove products
- View cart information

# Admin

The Admin page provides functionality for managing products.



# Project Structure


cloth-app-spa/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── SearchBar.jsx
│   │   └── ProductForm.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   └── Admin.jsx
│   │
│   ├── context/
│   │   └── ShopContext.jsx
│   │
│   ├── hooks/
│   │   └── useFetch.jsx
│   │
│   ├── tests/
│   │   ├── components/
│   │   │   ├── Navbar.test.jsx
│   │   │   ├── ProductCard.test.jsx
│   │   │   ├── ProductList.test.jsx
│   │   │   └── SearchBar.test.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useFetch.test.jsx
│   │   │
│   │   └── pages/
│   │       ├── Home.test.jsx
│   │       ├── Shop.test.jsx
│   │       ├── ProductDetails.test.jsx
│   │       ├── Cart.test.jsx
│   │       └── Admin.test.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── db.json
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
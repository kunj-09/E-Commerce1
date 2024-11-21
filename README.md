# E-Commerce Website

A comprehensive E-Commerce platform developed using **React.js**, **Express.js**, **MongoDB**, and integrated with a payment gateway for secure transactions.

## Features
- **User Authentication**: Sign up, login, and manage user accounts.
- **Product Search & Filtering**: Easily search for products and filter them by categories.
- **Dynamic Shopping Cart**: Add products to the cart, view, and update quantities.
- **Order Processing**: Admin and user interfaces for managing orders.
- **Payment Integration**: Secure payment processing using [Braintree](https://www.braintreepayments.com/).
- **Responsive Frontend**: Built with React.js and Context API for dynamic user interfaces.
- **Backend API**: RESTful APIs for product management, order processing, and user management.

## Tech Stack
- **Frontend**: React.js, Context API, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Payment Gateway**: Braintree
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/kunj-09/E-Commerce.git
cd E-Commerce

Navigate to the frontend directory:
cd frontend
npm install

Navigate to the backend directory:
cd backend
npm install

Backend .env file:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key
PORT=5000

Frontend .env file:
REACT_APP_API_URL=http://localhost:5000



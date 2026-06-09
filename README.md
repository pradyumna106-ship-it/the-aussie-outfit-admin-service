# the-aussie-outfit-admin-service

## Overview

Admin service for The Aussie Outfit e-commerce platform. This is an Express.js-based REST API that manages administrative operations including banners, coupons, and sales reporting with MongoDB integration.

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Multer
- **CORS**: Enabled for cross-origin requests
- **Testing**: Vitest
- **Development**: Nodemon for hot-reloading

## Features

- **Banner Management**: Create, read, update, and delete promotional banners
- **Coupon Management**: Handle discount coupons with CRUD operations
- **Sales Report Generation**: Generate and retrieve sales reports
- **File Upload Support**: Image uploads for banners via Multer
- **CORS Support**: Cross-origin resource sharing enabled for all HTTP methods
- **MongoDB Integration**: Persistent data storage with Mongoose schemas

## Project Structure

```
src/
├── index.js              # Application entry point
├── app.js                # Express app configuration
├── config/
│   ├── database.js       # MongoDB connection configuration
│   └── constant.js       # Application constants
├── controller/
│   ├── banner.js         # Banner management logic
│   ├── coupon.js         # Coupon management logic
│   └── reports.js        # Sales report generation logic
├── models/
│   ├── banner.js         # Banner schema
│   ├── coupon.js         # Coupon schema
│   └── reports.js        # Reports schema
└── route/
    ├── banner.js         # Banner endpoints
    ├── coupon.js         # Coupon endpoints
    └── report.js         # Reports endpoints
```

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd the-aussie-outfit-admin-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=5001
   MONGODB_URI=<your-mongodb-connection-string>
   ```

4. Start the service:
   ```bash
   npm start
   ```

## Scripts

- `npm install` - Install project dependencies
- `npm start` - Start the application (runs `node src/index.js`)
- `npm run dev` - Run application with auto-restart on file changes (nodemon)
- `npm test` - Run tests using Vitest
- `npm run test:watch` - Run tests in watch mode

## API Endpoints

### Coupon Management
- `GET /coupon` - Retrieve all coupons
- `POST /coupon` - Create a new coupon
- `PUT /coupon/:id` - Update a coupon
- `DELETE /coupon/:id` - Delete a coupon

### Banner Management
- `GET /banner` - Retrieve all banners
- `POST /banner` - Create a new banner (supports file upload)
- `PUT /banner/:id` - Update a banner
- `DELETE /banner/:id` - Delete a banner

### Sales Reports
- `GET /reports/sales` - Retrieve sales reports
- `POST /reports/sales` - Generate a new sales report

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5001` |
| `MONGODB_URI` | MongoDB connection string | Required |

## Dependencies

- **express** (^5.2.1) - Web framework
- **mongoose** (^9.6.1) - MongoDB ODM
- **dotenv** (^17.4.2) - Environment variable management
- **multer** (^2.1.1) - File upload middleware
- **cors** (^2.8.6) - CORS middleware
- **nodemon** (^3.1.14) - Development dependency for auto-restart

## Development Dependencies

- **vitest** (^4.1.4) - Unit testing framework

## Running the Application

The application starts on port `5001` by default and connects to MongoDB using the connection string from environment variables. File uploads are served from the `uploads` directory.

## License

ISC

# Backend API

This is a Node.js Express backend application following a structured MVC architecture.

## Project Structure

```
├── server.js              # Server entry point
├── app.js                 # Express application setup
├── config/                # Configuration files
├── controllers/           # Route handlers and business logic
├── middleware/            # Custom middleware (auth, logging, error handling)
├── models/                # Database models (e.g., Mongoose schemas)
├── routes/                # Route definitions, grouped by feature
├── utils/                 # Utility functions and helpers
├── tests/                 # Unit and integration tests
├── public/                # Static files
├── views/                 # Views/templates (if using server-side rendering)
├── .env                   # Environment variables
├── package.json
└── README.md
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   ```
   cp .env.example .env
   ```

3. Start the server:
   ```
   npm start
   ```

## Development

```
npm run dev
```

## Testing

```
npm test
```
# instant-note-backend

## Project Setup

## Setup environemnt variables

Rename .env.example to .env in the backend folder and replace the values.

```bash
MONGODB_URI=Your_MongoDB_connection_string
PORT=5000
JWT_SECRET=Your_JWT_secret_key
```

### Install dependencies and start the project

1. Backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Frontend
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Note: The backend runs on port 5000, which matches the frontend Axios base URL.
# Full-Stack Developer Portfolio Starter

A clean, minimal, production-ready full-stack developer portfolio template built with React, Vite, TypeScript, Tailwind CSS, Node.js, and Express.

## Features

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Design**: Clean minimal UI, fully responsive
- **API**: REST API with health check, projects list, and contact form submission..

## Quick Start

### 1. Install Dependencies

Run the following command from the root directory to install dependencies for the root, frontend, and backend projects:

```bash
npm run install:all
```

### 2. Environment Variables

- Create a `.env` file in the `frontend` directory:
  ```env
  VITE_API_URL=http://localhost:3000/api
  ```
- Create a `.env` file in the `backend` directory:
  ```env
  PORT=3000
  NODE_ENV=development
  ```

### 3. Run Development Server

From the root directory, start both the frontend and backend servers concurrently:

```bash
npm run dev
```

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:3000`

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel.
2. Select the `frontend` folder as the Root Directory.
3. Vercel will automatically detect Vite and configure the build settings.
4. Add the `VITE_API_URL` environment variable pointing to your deployed backend URL.

### Backend (Render)

1. Connect your GitHub repository to Render.
2. Create a new Web Service.
3. Select the `backend` folder as the Root Directory.
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Add environment variables (e.g., `PORT`, `NODE_ENV`).

### Connecting a Custom Domain

Both Vercel and Render provide straightforward ways to connect custom domains in their dashboard under the project settings -> domains section. Just add your domain and update your DNS records (A record or CNAME) as instructed by the platform.

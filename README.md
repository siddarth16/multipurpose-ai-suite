# Multipurpose AI Suite

This project is a web-based collection of AI utilities built with React, React Router and Tailwind CSS. The app features authentication via Supabase and includes several tools such as an email generator, resume helper and code debugger.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Development server**
   ```bash
   npm run dev
   ```
3. **Type checking**
   ```bash
   npm run typecheck
   ```
4. **Linting**
   ```bash
   npm run lint
   ```

5. **Run tests**
   ```bash
   npm test
   ```
6. **Build for production**
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file based on `.env.example` and provide your Supabase credentials.

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_GROQ_API_KEY=<your-groq-api-key>
```

## Features

- Greeting page with interactive start
- Authentication pages for sign in and sign up
- Tool selection and individual utilities
- Protected routes backed by Supabase sessions

## Continuous Integration

This project includes a GitHub Actions workflow that automatically runs linting,
type checking, tests, and a production build on each push or pull request.


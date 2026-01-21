# Netflix-GPT 🎬

A Netflix-inspired web application built using **React + Vite**, focusing on clean UI, performance, and scalable architecture.

---

## React + Vite
- Create Vite React app
- Configure Tailwind CSS
- Feature-based folder structure
- Constants file for images & hardcoded values
- Reusable Header component
- App routing setup
- Login form
- Sign up form
- Form validation (manual + regex)
- Firebase authentication setup
- Create Sign Up user account
- Implement Sign In user API
- Loader & error handling
- Setup Redux store
- Store only minimal auth data in Redux
- Implement Sign Out
- Update user profile
- Tried fetching movies from TMDB (blocked in India)
- Switched to fake/static movie data for stability

---

## Features

### Login / Sign Up
- Single form for Sign In & Sign Up
- Conditional rendering for name field
- Firebase authentication
- Error handling & loader for better UX
- Redirect to Browse page after login

---

### Browse
- Protected route (accessible only after login)
- Header with conditional user avatar
- Sign Out functionality
- Outside click handling for user menu

#### Main Movie (Hero Section)
- Trailer video in background
- Auto-play muted video
- Poster image fallback for mobile & data saver
- Smooth poster → video transition
- Dark overlay for text readability
- Video pauses after fixed duration
- Video stops when out of viewport (performance optimization)

#### Movie Suggestions
- Multiple categories (Trending, Drama, Action, History)
- Netflix-style horizontal rows
- Left & right arrow navigation
- Reusable MovieList & MovieCard components
- Lazy loaded movie posters
- Fake movie data used to avoid API dependency

---

### NetflixGPT
- GPT search page layout
- Search bar UI
- Placeholder for AI-based movie suggestions
- Architecture ready for OpenAI / LLM integration

---

## Performance Optimizations
- Lazy loading images
- Intersection Observer for video playback
- Avoid unnecessary Redux state
- Reduced re-renders using component separation
- Mobile & low-data optimization

---

## Tech Stack
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Firebase Authentication

---

## Key Learnings
- Vite is faster and more efficient than CRA
- Redux should store only global, minimal data
- UI state should remain local
- Real APIs are not mandatory for a strong portfolio
- Performance & UX matter more than API calls
- Feature-based architecture scales better

---

## Future Improvements
- Integrate real movie APIs
- Add GPT-powered movie recommendations
- Improve accessibility (ARIA, keyboard navigation)
- Add unit & integration tests
- Deploy with CI/CD pipeline

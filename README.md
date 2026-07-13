# NewsPortal — Modern News & Media Aggregator

**NewsPortal** is a high-quality application that makes you stay informed and also real-time news aggregation platform that delivers only modern and real-time events on the entire world. The project focuses on strong state management, advanced routing synchronization via URL queries, and optimized data lifecycle handling. It serves as a strong demonstration of production-ready React patterns and strict frontend architecture.

---

## Key Features

* **State-Driven Favorites System:** Interactive, real-time news bookmarking with individual card state toggles (`Add` / `Remove` from favorites) synced instantly across all views.
* **URL-Synchronized Search & Filtering:** Dynamic search queries and categories completely related to the browser's URL using custom router hooks (`useSearchParams`). Users can share exact search results or filtered states directly via links.
* **Smart UI Architecture:** Responsive grid structures, image fallback handlers for missing media, and responsive interactive feedback states.
* **High-performance optimization:** Optimized images loading and the other things which help with general optimization (PageSpeed showcases average 95 percent of application's quality)

---

## Tech Stack & Architecture Highlights

### React & React Router
* Implemented dynamic route states, history preservation (`state={{ from: location.pathname }}`), and global `basename` configuration for clean subdirectory production builds.

### Redux Toolkit (State Management)
* **Modular Slices:** Clean separation of concerns between global user data (`favoritesSlice`) and core news content streams (`articlesSlice`).
* **Advanced Data Invalidation:** Custom action logic (like `clearArticles`) designed to reset specific cache levels and intercept infinite re-fetching loops.

### Style Encapsulation
* **CSS Modules & clsx:** Strict layout modularity with scoped component styles, preventing global scope pollution and achieving predictable component rendering.
* **Zero-Weight Animations:** Optimized micro-interactions via pure CSS transitions, bypassing heavy third-party motion libraries for zero bundle bloat and strict 60 FPS performance.

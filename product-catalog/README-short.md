# Product Catalog

A React SPA with dummy login, product listing, and full CRUD functionality using the DummyJSON API.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:5173/login` to start.

## Routes

| Route | Description |
|---|---|
| `/login` | Login with any non-empty username and password |
| `/` | Product list with category filter, add, edit, delete |
| `/products/new` | Add a new product |
| `/products/:id` | View product details |
| `/products/:id/edit` | Edit an existing product |

## Features

- Dummy auth — saves `token: dummy` to localStorage on login
- Protected routes redirect to `/login` if no token exists
- Products fetched from `https://dummyjson.com/products?limit=30`
- Category filter derived from fetched data, not hardcoded
- Add, edit, delete with immediate state update after each API call
- Delete requires confirmation before removing
- Loading spinner shown while fetching, error message on failure

## Tech

- React 19, Vite, React Router DOM v7
- Hooks used: `useState`, `useEffect`, `useParams`, `useNavigate`

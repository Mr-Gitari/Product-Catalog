import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import ProductList from './Pages/ProductList'
import ProductDetail from './Pages/ProductDetail'
import ProductForm from './Pages/ProductForm'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=30')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <ProductList products={products} setProducts={setProducts} loading={loading} error={error} />
          </ProtectedRoute>
        } />
        <Route path="/products/new" element={
          <ProtectedRoute>
            <ProductForm products={products} setProducts={setProducts} />
          </ProtectedRoute>
        } />
        <Route path="/products/:id" element={
          <ProtectedRoute>
            <ProductDetail products={products} setProducts={setProducts} />
          </ProtectedRoute>
        } />
        <Route path="/products/:id/edit" element={
          <ProtectedRoute>
            <ProductForm products={products} setProducts={setProducts} />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
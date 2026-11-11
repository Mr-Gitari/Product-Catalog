import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function ProductList({ products, setProducts, loading, error }) {
  const [category, setCategory] = useState('')
  const navigate = useNavigate()

  const categories = [...new Set(products.map(p => p.category))]
  const filtered = category ? products.filter(p => p.category === category) : products

  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(prev => prev.filter(p => p.id !== id)))
  }

  return (
    <div>
      <h1>Product Catalog</h1>
      <button onClick={() => navigate('/products/new')}>Add Product</button>
      <button onClick={() => { localStorage.removeItem('token'); navigate('/login') }}>Logout</button>

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {loading && <Spinner />}
      {error && <p>{error}</p>}

      <div>
        {filtered.map(product => (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} width="100" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => navigate(`/products/${product.id}`)}>View</button>
            <button onClick={() => navigate(`/products/${product.id}/edit`)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList

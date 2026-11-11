import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ProductForm({ products, setProducts }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const existing = id ? products.find(p => p.id === Number(id)) : null

  if (id && !existing) {
    navigate('/')
    return null
  }

  const [title, setTitle] = useState(existing ? existing.title : '')
  const [price, setPrice] = useState(existing ? existing.price : '')
  const [category, setCategory] = useState(existing ? existing.category : '')
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    if (!title) { setError('Title is required'); return }
    if (!price || Number(price) <= 0) { setError('Price must be a positive number'); return }
    if (!category) { setError('Category is required'); return }

    if (existing) {
      fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price: Number(price), category })
      })
        .then(res => res.json())
        .then(updated => {
          setProducts(prev => prev.map(p => p.id === Number(id) ? { ...p, ...updated } : p))
          navigate(`/products/${id}`)
        })
    } else {
      fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price: Number(price), category })
      })
        .then(res => res.json())
        .then(newProduct => {
          setProducts(prev => [...prev, newProduct])
          navigate('/')
        })
    }
  }

  return (
    <div>
      <h1>{existing ? 'Edit Product' : 'Add Product'}</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
        </div>
        <button type="submit">{existing ? 'Update' : 'Add'}</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  )
}

export default ProductForm

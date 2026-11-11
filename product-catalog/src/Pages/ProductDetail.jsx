import { useParams, useNavigate } from 'react-router-dom'

function ProductDetail({ products, setProducts }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    navigate('/')
    return null
  }

  function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' })
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== Number(id)))
        navigate('/')
      })
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>Back</button>
      <img src={product.thumbnail} alt={product.title} width="200" />
      <h1>{product.title}</h1>
      <p>${product.price}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>Rating: {product.rating}</p>
      <button onClick={() => navigate(`/products/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default ProductDetail

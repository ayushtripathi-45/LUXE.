import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { toast, Toaster } from '../components/Toast'

const Stars = ({ rating, reviews, isDark }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-gold' : isDark ? 'text-white/20' : 'text-ink/20'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0
            1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54
            1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
            1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
    <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-ink'}`}>{rating}</span>
    <span className={`text-sm ${isDark ? 'text-white/40' : 'text-ink/40'}`}>({reviews} reviews)</span>
  </div>
)

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useCart()
  const { isDark } = useTheme()
  const { user, openAuth } = useAuth()
  const product = products.find(p => p.id === parseInt(id))

  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)

  if (!product) return (
    <div className={`text-center py-32 ${isDark ? 'text-white' : ''}`}>
      <p className={`font-display text-2xl ${isDark ? 'text-white/40' : 'text-ink/40'}`}>Product not found</p>
      <Link to="/" className="btn-primary mt-6 inline-block">Back to Shop</Link>
    </div>
  )

  const handleAdd = () => {
    dispatch({ type: 'ADD', product, qty })
    toast.success(`${qty}× ${product.title} added to cart`)
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in ${isDark ? 'text-white' : ''} transition-colors`}>

      {/* Breadcrumb */}
      <nav className={`text-sm ${isDark ? 'text-white/40' : 'text-ink/40'} mb-8 flex items-center gap-2`}>
        <Link to="/" className={`${isDark ? 'hover:text-accent' : 'hover:text-accent'} transition-colors`}>Shop</Link>
        <span>/</span>
        <span className={isDark ? 'text-white/60' : 'text-ink/60'}>{product.category}</span>
        <span>/</span>
        <span className={isDark ? 'text-white' : 'text-ink'}>{product.title}</span>
      </nav>

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

        {/* Images */}
        <div className="space-y-4">
          <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-cream-dark'} aspect-square`}>
            <img src={product.images[activeImg]} alt={product.title}
              className="w-full h-full object-cover transition-all duration-500"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500?text=Image+Loading'
              }} />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`rounded-2xl overflow-hidden w-20 h-20 border-2 transition-all
                  ${activeImg === i ? 'border-accent' : `border-transparent opacity-60 hover:opacity-100 ${isDark ? 'bg-gray-800' : 'bg-cream-dark'}`}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center animate-slide-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">{product.category}</span>
            {product.badge && (
              <span className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {product.badge}
              </span>
            )}
            {product.discount && (
              <span className="bg-red-500/10 text-red-500 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          <h1 className={`font-display text-4xl sm:text-5xl font-bold ${isDark ? 'text-white' : 'text-ink'} leading-tight mb-4`}>
            {product.title}
          </h1>

          <Stars rating={product.rating} reviews={product.reviews} isDark={isDark} />

          <p className={`mt-6 ${isDark ? 'text-white/60' : 'text-ink/60'} leading-relaxed text-base`}>{product.description}</p>

          <div className={`mt-8 pt-8 ${isDark ? 'border-gray-700' : 'border-cream-dark'} border-t`}>
            <div className="flex items-baseline gap-3">
              <span className={`font-display text-4xl font-bold ${isDark ? 'text-accent' : 'text-ink'}`}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className={`text-xl line-through ${isDark ? 'text-white/40' : 'text-ink/40'}`}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <p className={`text-xs ${isDark ? 'text-white/40' : 'text-ink/40'} mt-1`}>Free shipping on orders over ₹1000</p>
          </div>

          {/* Qty + Add */}
          <div className="flex items-center gap-4 mt-8">
            <div className={`flex items-center ${isDark ? 'bg-gray-800' : 'bg-cream-dark'} rounded-full overflow-hidden`}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className={`w-11 h-11 flex items-center justify-center ${isDark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/10'} transition-colors text-lg font-semibold`}>
              −</button>
              <span className={`w-10 text-center font-semibold ${isDark ? 'text-white' : 'text-ink'}`}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className={`w-11 h-11 flex items-center justify-center ${isDark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/10'} transition-colors text-lg font-semibold`}
              >+</button>
            </div>
            <button onClick={handleAdd} className="btn-primary flex-1">
              Add to Cart — ₹{(product.price * qty).toLocaleString('en-IN')}
            </button>
          </div>

          <button onClick={() => {
              if (!user) {
                openAuth(() => { handleAdd(); navigate('/cart') })
              } else {
                handleAdd(); navigate('/cart')
              }
            }}
            className="btn-outline w-full mt-3" id="buy-now-btn">
            Buy Now
          </button>

          {/* Trust badges */}
          <div className={`flex items-center gap-6 mt-8 pt-6 ${isDark ? 'border-gray-700' : 'border-cream-dark'} border-t`}>
            {[{ icon: '♻', label: 'Sustainable' },
              { icon: '✦', label: 'Handcrafted' },
              { icon: '↩', label: '30‑day returns' }].map(b => (
                <div key={b.label} className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-white/40' : 'text-ink/40'}`}>
                  <span className="text-gold">{b.icon}</span> {b.label}
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className={`font-display text-3xl font-bold ${isDark ? 'text-white' : 'text-ink'} mb-8`}>You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`}
                className={`group ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'} rounded-3xl overflow-hidden card-hover block transition-colors`}>
                <div className={`aspect-[4/3] overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-cream-dark'}`}>
                  <img src={p.image} alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500?text=Image+Loading'
                    }} />
                </div>
                <div className="p-4">
                  <p className={`font-display text-base font-semibold ${isDark ? 'text-white group-hover:text-accent' : 'text-ink group-hover:text-accent'} transition-colors`}>{p.title}</p>
                  <p className={`text-sm font-bold ${isDark ? 'text-accent' : 'text-ink'} mt-1`}>₹{p.price.toLocaleString('en-IN')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

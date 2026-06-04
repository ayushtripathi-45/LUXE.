import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { toast } from './Toast'

const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(s => (
      <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-gold' : 'text-ink/20 dark:text-white/20'}`}
        fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0
          1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54
          1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
          1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
    <span className="text-xs text-ink/50 dark:text-white/50 ml-1">{rating}</span>
  </div>
)

export default function ProductCard({ product }) {
  const { dispatch } = useCart()
  const { isDark } = useTheme()

  const handleAdd = (e) => {
    e.preventDefault()
    dispatch({ type: 'ADD', product })
    toast.success(`${product.title} added to cart`)
  }

  return (
    <Link to={`/product/${product.id}`}
      className={`group ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'} rounded-3xl overflow-hidden card-hover animate-fade-in block transition-colors`}>

      {/* Image */}
      <div className={`relative overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-cream-dark'} aspect-[4/3]`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500?text=Image+Loading'
          }}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold
                           px-3 py-1 rounded-full tracking-wide">
            {product.badge}
          </span>
        )}
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold
                           px-3 py-1 rounded-full tracking-wide">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className={`text-xs ${isDark ? 'text-white/40' : 'text-ink/40'} font-medium uppercase tracking-widest mb-1`}>
          {product.category}
        </p>
        <h3 className={`font-display text-lg font-semibold ${isDark ? 'text-white group-hover:text-accent' : 'text-ink group-hover:text-accent'} leading-tight mb-2 transition-colors`}>
          {product.title}
        </h3>
        <Stars rating={product.rating} />
        <p className={`text-xs ${isDark ? 'text-white/40' : 'text-ink/40'} mt-0.5`}>{product.reviews} reviews</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col gap-1">
            <span className={`font-display text-xl font-bold ${isDark ? 'text-accent' : 'text-ink'}`}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className={`text-xs line-through ${isDark ? 'text-white/40' : 'text-ink/40'}`}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`${isDark ? 'bg-accent hover:bg-accent-dark text-white' : 'bg-ink hover:bg-accent text-cream'} text-xs font-semibold px-4 py-2 rounded-full
                       transition-all duration-200 active:scale-95`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { toast } from '../components/Toast'

export default function Cart() {
  const { cart, dispatch, itemCount, subtotal, tax, total } = useCart()
  const { isDark } = useTheme()
  const { user, openAuth } = useAuth()

  const handleCheckout = () => {
    if (!user) {
      openAuth(() => toast.success('Order placed successfully! 🛍️'))
    } else {
      toast.success('Order placed successfully! 🛍️')
    }
  }

  const remove = (item) => {
    dispatch({ type: 'REMOVE', id: item.id })
    toast.error(`${item.title} removed`)
  }

  if (cart.length === 0) return (
    <div className={`max-w-2xl mx-auto px-4 py-32 text-center animate-fade-in ${isDark ? 'text-white' : ''}`}>
      <div className={`w-24 h-24 ${isDark ? 'bg-gray-800' : 'bg-cream-dark'} rounded-full flex items-center justify-center mx-auto mb-6`}>
        <svg className={`w-10 h-10 ${isDark ? 'text-white/30' : 'text-ink/30'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 className={`font-display text-3xl font-bold ${isDark ? 'text-white' : 'text-ink'} mb-2`}>Your cart is empty</h2>
      <p className={`${isDark ? 'text-white/40' : 'text-ink/40'} mb-8`}>Time to find something extraordinary.</p>
      <Link to="/" className="btn-primary inline-block">Continue Shopping</Link>
    </div>
  )

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-12 animate-fade-in ${isDark ? 'text-white' : ''}`}>
      <h1 className={`font-display text-4xl font-bold ${isDark ? 'text-white' : 'text-ink'} mb-2`}>Your Cart</h1>
      <p className={`${isDark ? 'text-white/40' : 'text-ink/40'} mb-10`}>{itemCount} item{itemCount !== 1 ? 's' : ''}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-5 flex gap-5 items-center animate-slide-up card-hover transition-colors`}>
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title}
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ${isDark ? 'bg-gray-700' : 'bg-cream-dark'} shrink-0`} />
              </Link>
              <div className="flex-1 min-w-0">
                <p className={`text-xs ${isDark ? 'text-white/40' : 'text-ink/40'} uppercase tracking-widest`}>{item.category}</p>
                <Link to={`/product/${item.id}`}>
                  <h3 className={`font-display font-semibold ${isDark ? 'text-white group-hover:text-accent' : 'text-ink'} text-lg leading-tight mt-0.5 hover:text-accent transition-colors truncate`}>
                    {item.title}
                  </h3>
                </Link>
                <p className={`font-bold ${isDark ? 'text-accent' : 'text-ink'} mt-1`}>₹{item.price.toLocaleString('en-IN')}</p>

                {/* Qty controls */}
                <div className="flex items-center gap-3 mt-3">
                  <div className={`flex items-center ${isDark ? 'bg-gray-700' : 'bg-cream-dark'} rounded-full`}>
                    <button onClick={() => dispatch({ type: 'DEC', id: item.id })}
                      className={`w-9 h-9 flex items-center justify-center ${isDark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/10'} rounded-full transition-colors font-semibold`}
                    >−</button>
                    <span className={`w-8 text-center text-sm font-semibold ${isDark ? 'text-white' : ''}`}>{item.qty}</span>
                    <button onClick={() => dispatch({ type: 'INC', id: item.id })}
                      className={`w-9 h-9 flex items-center justify-center ${isDark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/10'} rounded-full transition-colors font-semibold`}
                    >+</button>
                  </div>
                  <button onClick={() => remove(item)}
                    className={`text-xs ${isDark ? 'text-white/30 hover:text-red-400' : 'text-ink/30 hover:text-red-400'} transition-colors font-medium`}
                  >Remove</button>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className={`font-display font-bold text-xl ${isDark ? 'text-accent' : 'text-ink'}`}>
                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2">
            <Link to="/" className={`text-sm ${isDark ? 'text-white/40 hover:text-accent' : 'text-ink/40 hover:text-accent'} transition-colors font-medium`}>
              ← Continue Shopping
            </Link>
            <button onClick={() => { dispatch({ type: 'CLEAR' }); toast.error('Cart cleared') }}
              className={`text-sm ${isDark ? 'text-white/40 hover:text-red-400' : 'text-ink/40 hover:text-red-400'} transition-colors font-medium`}
            >Clear Cart</button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-7 sticky top-28 animate-slide-up transition-colors`}>
            <h2 className={`font-display text-2xl font-bold ${isDark ? 'text-white' : 'text-ink'} mb-6`}>Order Summary</h2>
            <div className={`space-y-3 text-sm ${isDark ? 'text-white/60' : 'text-ink/60'}`}>
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={subtotal >= 1000 ? 'text-green-500 font-medium' : ''}>
                  {subtotal >= 1000 ? 'Free' : '₹500'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className={`border-t ${isDark ? 'border-gray-700' : 'border-cream-dark'} pt-3 mt-3 flex justify-between font-bold ${isDark ? 'text-white' : 'text-ink'} text-base`}>
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-xl text-accent">
                  ₹{(total + (subtotal < 1000 ? 500 : 0)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            {subtotal < 1000 && (
              <p className="text-xs text-accent mt-3 bg-accent/10 rounded-2xl px-3 py-2">
                Add ₹{(1000 - subtotal).toLocaleString('en-IN')} more for free shipping!
              </p>
            )}
            <button onClick={handleCheckout} className="btn-primary w-full mt-6 text-center" id="checkout-btn">
              Checkout
            </button>
            <p className={`text-center text-xs ${isDark ? 'text-white/30' : 'text-ink/30'} mt-3`}>
              Secure checkout · SSL encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

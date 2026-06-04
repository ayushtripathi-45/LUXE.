import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { itemCount } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const { user, openAuth, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 ${isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-cream/90 border-cream-dark'} backdrop-blur-md border-b transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <span className={`font-display text-2xl font-bold ${isDark ? 'text-white' : 'text-ink'} tracking-tight`}>LUXE</span>
          <span className="text-gold text-2xl font-display">.</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:flex">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products..."
              className={`w-full ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder:text-white/40 focus:border-gold' : 'bg-cream-dark border-cream-dark text-ink placeholder:text-ink/40'} border rounded-full px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold/20 transition-all`}
            />
            <button type="submit" className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/50 hover:text-white' : 'text-ink/50 hover:text-ink'} transition-colors`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Account */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                  bg-gradient-to-br from-gold to-accent text-white hover:shadow-lg hover:shadow-gold/30`}
                id="user-avatar-btn"
                title={user.name}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <div className={`absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-up
                    ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-cream-dark'}`}>
                    <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-cream-dark'}`}>
                      <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-ink'}`}>{user.name}</p>
                      <p className={`text-xs ${isDark ? 'text-white/40' : 'text-ink/40'} truncate`}>{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { setShowUserMenu(false); logout(); }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors
                          ${isDark ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-cream'}`}
                        id="logout-btn"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuth()}
              className={`p-2 rounded-full transition-all duration-200
                ${isDark ? 'bg-gray-800 text-white/60 hover:bg-gray-700 hover:text-white' : 'bg-cream-dark text-ink/60 hover:text-ink hover:bg-cream'}`}
              title="Sign in"
              id="signin-btn"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          )}

          {/* Cart */}
          <Link to="/cart" className={`relative p-2 hover:scale-110 transition-transform ${isDark ? 'text-white' : 'text-ink'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-pop">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

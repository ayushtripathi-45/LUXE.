import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import { useTheme } from '../context/ThemeContext'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('default')
  const { isDark } = useTheme()
  const searchQuery = searchParams.get('search') || ''

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory)
    if (searchQuery) list = list.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [activeCategory, searchQuery, sort])

  return (
    <>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-12 ${isDark ? 'text-white' : ''} transition-colors`}>

        {/* Hero */}
        <div className="text-center mb-14 animate-slide-up">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-3">
            Curated Collection
          </p>
          <h1 className={`font-display text-5xl sm:text-6xl font-bold ${isDark ? 'text-white' : 'text-ink'} leading-tight`}>
            Objects Worth
            <br />
            <span className="text-accent">Owning.</span>
          </h1>
          <p className={`mt-4 ${isDark ? 'text-white/50' : 'text-ink/50'} max-w-md mx-auto text-base`}>
            Thoughtfully designed goods for everyday living. Quality over quantity, always.
          </p>
        </div>

        {/* Filters */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8`}>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${activeCategory === cat
                    ? 'bg-accent text-white'
                    : isDark 
                      ? 'bg-gray-800 text-white/60 hover:text-white hover:bg-gray-700 border border-gray-700'
                      : 'bg-white text-ink/60 hover:text-ink hover:bg-cream-dark border border-cream-dark'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className={`rounded-full px-4 py-2 text-sm outline-none cursor-pointer focus:ring-2 focus:ring-gold/20 transition-all
              ${isDark 
                ? 'bg-gray-800 border border-gray-700 text-white focus:border-gold' 
                : 'bg-white border border-cream-dark text-ink focus:border-gold'}`}
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Search label */}
        {searchQuery && (
          <p className={`mb-6 text-sm ${isDark ? 'text-white/50' : 'text-ink/50'}`}>
            Results for <span className={`font-semibold ${isDark ? 'text-white' : 'text-ink'}`}>"{searchQuery}"</span>
            {' '}— {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className={`text-center py-24 ${isDark ? 'text-white/30' : 'text-ink/30'}`}>
            <p className="text-5xl mb-4">∅</p>
            <p className={`font-display text-xl ${isDark ? 'text-white/50' : ''}`}>No products found</p>
          </div>
        )}
      </div>
    </>
  )
}

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from './Toast';

export default function AuthModal() {
  const { showAuthModal, closeAuth, login, signup } = useAuth();
  const { isDark } = useTheme();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [isAnimating, setIsAnimating] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const modalRef = useRef(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (showAuthModal) {
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      setMode('login');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [showAuthModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showAuthModal]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeAuth();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeAuth]);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) closeAuth();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const switchMode = (newMode) => {
    setIsAnimating(true);
    setTimeout(() => {
      setMode(newMode);
      setErrors({});
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setShowPassword(false);
      setShowConfirmPassword(false);
      setIsAnimating(false);
    }, 200);
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'login') {
      login({ email: formData.email });
      toast.success('Welcome back! Login successful ✨');
    } else {
      signup({ name: formData.name, email: formData.email });
      toast.success('Account created successfully! 🎉');
    }
  };

  if (!showAuthModal) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      id="auth-modal-backdrop"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up
          ${isDark ? 'bg-gray-900' : 'bg-white'}`}
        id="auth-modal"
      >
        {/* Top decorative gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-gold via-accent to-gold" />

        {/* Close button */}
        <button
          onClick={closeAuth}
          className={`absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
            ${isDark
              ? 'bg-gray-800 text-white/60 hover:bg-gray-700 hover:text-white'
              : 'bg-cream-dark text-ink/40 hover:bg-cream hover:text-ink'
            }`}
          id="auth-close-btn"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 pt-8 pb-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
              ${isDark ? 'bg-gray-800' : 'bg-cream-dark'}`}>
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className={`font-display text-3xl font-bold ${isDark ? 'text-white' : 'text-ink'}`}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className={`text-sm mt-2 ${isDark ? 'text-white/40' : 'text-ink/40'}`}>
              {mode === 'login'
                ? 'Sign in to continue your shopping experience'
                : 'Join LUXE for exclusive deals & rewards'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className={`space-y-4 transition-all duration-200 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              {/* Full Name — signup only */}
              {mode === 'signup' && (
                <div>
                  <label htmlFor="auth-name" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5
                    ${isDark ? 'text-white/50' : 'text-ink/50'}`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/30' : 'text-ink/30'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      id="auth-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200
                        ${isDark
                          ? 'bg-gray-800 border-gray-700 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20'
                          : 'bg-cream border-cream-dark text-ink placeholder:text-ink/30 focus:border-gold focus:ring-gold/20'
                        } border focus:ring-2
                        ${errors.name ? '!border-red-400 !ring-red-400/20' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 animate-slide-up">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="auth-email" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5
                  ${isDark ? 'text-white/50' : 'text-ink/50'}`}>
                  Email Address
                </label>
                <div className="relative">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/30' : 'text-ink/30'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    id="auth-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200
                      ${isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20'
                        : 'bg-cream border-cream-dark text-ink placeholder:text-ink/30 focus:border-gold focus:ring-gold/20'
                      } border focus:ring-2
                      ${errors.email ? '!border-red-400 !ring-red-400/20' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 animate-slide-up">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="auth-password" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5
                  ${isDark ? 'text-white/50' : 'text-ink/50'}`}>
                  Password
                </label>
                <div className="relative">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/30' : 'text-ink/30'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-11 py-3 rounded-xl text-sm outline-none transition-all duration-200
                      ${isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20'
                        : 'bg-cream border-cream-dark text-ink placeholder:text-ink/30 focus:border-gold focus:ring-gold/20'
                      } border focus:ring-2
                      ${errors.password ? '!border-red-400 !ring-red-400/20' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors
                      ${isDark ? 'text-white/30 hover:text-white/60' : 'text-ink/30 hover:text-ink/60'}`}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 animate-slide-up">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password — signup only */}
              {mode === 'signup' && (
                <div>
                  <label htmlFor="auth-confirm-password" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5
                    ${isDark ? 'text-white/50' : 'text-ink/50'}`}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/30' : 'text-ink/30'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    <input
                      id="auth-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-11 pr-11 py-3 rounded-xl text-sm outline-none transition-all duration-200
                        ${isDark
                          ? 'bg-gray-800 border-gray-700 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20'
                          : 'bg-cream border-cream-dark text-ink placeholder:text-ink/30 focus:border-gold focus:ring-gold/20'
                        } border focus:ring-2
                        ${errors.confirmPassword ? '!border-red-400 !ring-red-400/20' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors
                        ${isDark ? 'text-white/30 hover:text-white/60' : 'text-ink/30 hover:text-ink/60'}`}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 animate-slide-up">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Remember me / Forgot password — login only */}
              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs">
                  <label className={`flex items-center gap-2 cursor-pointer ${isDark ? 'text-white/50' : 'text-ink/50'}`}>
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-gold focus:ring-gold/30 cursor-pointer" />
                    Remember me
                  </label>
                  <button type="button"
                    onClick={() => toast.success('Password reset link sent! (simulated)')}
                    className="text-gold hover:text-gold/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                id="auth-submit-btn"
                className="w-full bg-gradient-to-r from-accent to-accent-dark text-white font-semibold py-3.5 rounded-xl
                  transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.98] text-sm tracking-wide mt-2"
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>

              {/* Divider */}
              <div className="relative my-2">
                <div className={`absolute inset-0 flex items-center`}>
                  <div className={`w-full border-t ${isDark ? 'border-gray-700' : 'border-cream-dark'}`} />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className={`px-3 ${isDark ? 'bg-gray-900 text-white/30' : 'bg-white text-ink/30'}`}>
                    or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    login({ email: 'user@google.com', name: 'Google User' });
                    toast.success('Signed in with Google ✨');
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isDark
                      ? 'bg-gray-800 text-white/70 hover:bg-gray-700 border border-gray-700'
                      : 'bg-cream text-ink/70 hover:bg-cream-dark border border-cream-dark'
                    }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => {
                    login({ email: 'user@github.com', name: 'GitHub User' });
                    toast.success('Signed in with GitHub ✨');
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isDark
                      ? 'bg-gray-800 text-white/70 hover:bg-gray-700 border border-gray-700'
                      : 'bg-cream text-ink/70 hover:bg-cream-dark border border-cream-dark'
                    }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
          </form>

          {/* Toggle link */}
          <p className={`text-center text-sm mt-6 ${isDark ? 'text-white/40' : 'text-ink/40'}`}>
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => switchMode('signup')}
                  className="text-gold font-semibold hover:text-gold/80 transition-colors" id="switch-to-signup">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => switchMode('login')}
                  className="text-gold font-semibold hover:text-gold/80 transition-colors" id="switch-to-login">
                  Sign in
                </button>
              </>
            )}
          </p>

          {/* Security note */}
          <p className={`text-center text-[10px] mt-4 ${isDark ? 'text-white/20' : 'text-ink/20'}`}>
            🔒 Your data is protected with SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}

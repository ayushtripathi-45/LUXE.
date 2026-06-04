import { createContext, useContext, useState, useCallback } from 'react';

const ToastCtx = createContext();

let _addToast = null;

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  _addToast = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-medium animate-slide-up
            ${t.type === 'success'
              ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-white/10'
              : 'bg-gradient-to-r from-red-600 to-red-500 text-white border border-red-400/20'
            }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0
            ${t.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-white/20 text-white'}`}>
            {t.type === 'success' ? '✓' : '✕'}
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export const toast = {
  success: (msg) => _addToast?.(msg, 'success'),
  error: (msg) => _addToast?.(msg, 'error'),
};

import { Sun, Moon, ChevronLeft } from 'lucide-react';
import { useDarkMode } from '../App';

function Navbar({ onBack, showBack = false, className = '' }) {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 bg-white/95 dark:bg-gray-900/95 shadow-sm dark:shadow-gray-800/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ${className}`}>

      <div className="flex items-center gap-3">
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all duration-200 text-gray-600 dark:text-gray-300 font-medium text-sm"
            aria-label="Go back"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
          CareerForge
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {!showBack && (
          <div className="hidden md:flex gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 mr-2">
            <a href="#features" className="hover:text-violet-600 dark:hover:text-violet-400 px-3 py-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all">Features</a>
            <a href="#pricing" className="hover:text-violet-600 dark:hover:text-violet-400 px-3 py-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all">Pricing</a>
            <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 px-3 py-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all">Login</a>
          </div>
        )}

        <button
          onClick={toggleDark}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all duration-200 border border-gray-200/60 dark:border-gray-700/60"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
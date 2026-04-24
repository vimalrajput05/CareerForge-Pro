import { Sun, Moon, ChevronLeft } from 'lucide-react';
function Navbar({ onBack, showBack = false, className = '', onLogin, isAuthenticated, setIsAuthenticated, setCurrentPage }) {
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('careerforge_auth');
    setCurrentPage('home');
  };

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 bg-white/95 dark:bg-gray-900/95 shadow-sm dark:shadow-gray-800/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ${className}`}>

      <div className="flex items-center gap-3">
        {showBack && onBack && (
          <button
          onClick={() => onBack && onBack()}
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
            {!isAuthenticated ? (
              <button
                onClick={onLogin}
                className="hover:text-violet-600 dark:hover:text-violet-400 px-3 py-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all font-semibold"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        )}


        <div className="w-10"></div>
      </div>
    </nav>
  );
}

export default Navbar;
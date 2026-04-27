import { motion } from "framer-motion";
import { Mail, Lock, Shield, ArrowRight, X } from "lucide-react";

function Login({ setCurrentPage, setIsAuthenticated }) {
  const handleLogin = (e) => {
    e.preventDefault();
    // Fake login - in real app, call API here
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-md"
      >
        {/* Close button - adjusted */}
        <button
          onClick={() => setCurrentPage("home")}
          className="absolute -top-4 right-4 z-10 w-14 h-14 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-gray-600 hover:text-violet-600 hover:bg-violet-50 hover:shadow-violet-200 transition-all duration-200 border border-gray-100 hover:border-violet-200"
        >
          <X className="w-6 h-6" />
        </button>


        {/* Card */}
        <div className="bg-white rounded-[2rem] shadow-xl px-6 sm:px-8 pt-10 pb-8">

          {/* Welcome Section */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Welcome Back! 👋
            </h2>

            <p className="text-gray-500 text-base sm:text-lg mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 space-y-5"
          >
            {/* Email */}
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 bg-gray-50">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent outline-none text-base text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 bg-gray-50">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none text-base text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
              type="submit"
              className="w-full mt-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-3 text-lg font-semibold shadow-md flex items-center justify-center gap-2 hover:from-violet-700 hover:to-fuchsia-600 transition-all"
              onClick={handleLogin}
            >
              Login
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.form>

          {/* Signup */}
<p className="text-center text-gray-500">
  New here?{" "}
  <button
    type="button"
    onClick={() => setCurrentPage("signup")}
    className="font-semibold text-violet-600 underline hover:text-fuchsia-600 transition"
  >
    Create Account
  </button>
</p>
          {/* Bottom */}
          <div className="mt-6 border-t border-gray-200 pt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Secure login with 256-bit encryption</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
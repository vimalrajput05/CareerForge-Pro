import { motion } from 'framer-motion';
import Navbar from "../components/Navbar";

function Home({ setCurrentPage, isPro }) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-violet-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-all duration-1000"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
<Navbar onLogin={() => setCurrentPage("login")} />
      {/* Hero Section */}
      <motion.section
        className="text-center py-20 sm:py-24 px-4 sm:px-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.p
          className="inline-block px-4 sm:px-5 py-2 rounded-full bg-violet-100/90 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 font-medium mb-6 shadow-lg backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
        >
          AI Resume Builder {isPro && <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold">PRO</span>}
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Build ATS-Friendly <br />
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-fuchsia-400">
            Resumes With AI
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Upload your resume, paste job description, and improve your ATS score instantly
        </motion.p>

        <motion.button
          onClick={() => setCurrentPage("builder")}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white px-6 sm:px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4, type: 'spring' }}
        >
          Start Building Your Future
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="px-4 sm:px-10 py-16 sm:py-20 bg-white/80 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          Why Choose CareerForge?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {[
            { title: "JD Analysis", desc: "AI reads job description & extracts key keywords automatically.", icon: "🔍", action: () => setCurrentPage("jd-analysis") },
            { title: "ATS Score", desc: "Real-time ATS compatibility score & improvement suggestions.", icon: "📊", action: () => setCurrentPage("ats-score") },
            { title: "PDF Export", desc: "One-click professional PDF resume download.", icon: "📄", action: () => setCurrentPage("resume") }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              onClick={feature.action}
              className="group relative bg-white/90 dark:bg-gray-800/90 p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 dark:border-gray-700/50 backdrop-blur-sm cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-fuchsia-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <span className="text-3xl p-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg inline-block mb-4">
                {feature.icon}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
            {/* Pricing Section */}
<motion.section
  id="pricing"
  className="py-20 px-4 sm:px-10 bg-gradient-to-b from-white/60 to-violet-50/50 dark:from-gray-900/70 dark:to-slate-800/60"
  initial={{ y: 50, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-gray-900 dark:text-white">
    Choose Your Plan
  </h2>

  <p className="text-center text-gray-500 dark:text-gray-300 mb-14 text-lg">
    Start free and upgrade anytime
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    {/* Free Plan */}
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-[2rem] shadow-xl border border-white/60 dark:border-gray-700/60 p-8"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Free Plan
      </h3>

      <p className="text-5xl font-black text-slate-900 dark:text-white mb-6">
        ₹0
      </p>

      <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-base">
        <li>✔ 1 Resume Build</li>
        <li>✔ Basic ATS Score</li>
        <li>✔ PDF Download</li>
      </ul>
    </motion.div>

    {/* Pro Plan */}
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative rounded-[2rem] p-8 shadow-2xl text-white bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500"
    >
      <span className="inline-block mb-5 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
        ⭐ Most Popular
      </span>

      <h3 className="text-2xl font-bold mb-3">
        Pro Plan
      </h3>

      <p className="text-5xl font-black mb-6">
        ₹499
      </p>

      <ul className="space-y-4 text-base">
        <li>✔ Unlimited Resumes</li>
        <li>✔ AI Rewrite</li>
        <li>✔ Premium Templates</li>
        <li>✔ Cover Letter Generator</li>
      </ul>
    </motion.div>
  </div>
</motion.section>

      {/* How It Works */}
      <motion.section
        className="py-16 sm:py-20 px-4 sm:px-10 bg-gradient-to-b from-white/70 to-violet-50/50 dark:from-gray-900/70 dark:to-slate-800/50 border-y border-gray-200/30 dark:border-gray-700/30"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14 text-gray-900 dark:text-white">
          How It Works
        </h2>

        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 sm:gap-6 min-w-max sm:min-w-0 sm:grid sm:grid-cols-4 lg:grid-cols-7 max-w-7xl mx-auto">
            {[
              { name: "Create Resume", page: "builder" },
              { name: "Analyze JD", page: "jd-analysis" },
              { name: "Improve Content", page: "improve-resume" },
              { name: "Check ATS Score", page: "ats-score" },
              { name: "Cover Letter", page: "cover-letter" },
              { name: "Upgrade Pro", page: "pricing" },
              { name: "Dashboard", page: "dashboard" }
            ].map((step, index) => (
              <motion.div
                key={typeof step === 'string' ? step : step.name}
                onClick={() => step.page ? setCurrentPage(step.page) : (step.action && step.action())}
                className="w-32 sm:w-auto p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-xl border border-violet-100/50 dark:border-gray-700/50 bg-violet-50/90 dark:bg-gray-800/80 cursor-pointer group transition-all duration-300 text-center flex-shrink-0 sm:flex-shrink"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">
                  {step.name || step}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer (Quick Links updated to work) */}
      <footer className="bg-gradient-to-r from-slate-950 to-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
              CareerForge
            </h2>
            <p className="text-slate-300 leading-7 text-sm">
              Build ATS-friendly resumes with AI powered insights and land your dream job.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li onClick={() => document.getElementById('features').scrollIntoView()} className="hover:text-violet-400 cursor-pointer transition-colors">Features</li>
              <li onClick={() => document.getElementById('pricing').scrollIntoView()} className="hover:text-violet-400 cursor-pointer transition-colors">Pricing</li>
              <li onClick={() => setCurrentPage("dashboard")} className="hover:text-violet-400 cursor-pointer transition-colors">Dashboard</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <p className="text-slate-300 mb-2 text-sm">support@careerforge.ai</p>
            <p className="text-slate-300 text-sm">Chennai, Tamil Nadu</p>
          </div>
        </div>
        <div className="text-center text-slate-400 border-t border-slate-700/50 pt-6 text-sm">
          © 2026 CareerForge. All rights reserved.
        </div>
      </footer>
    </motion.div>
  );
}

export default Home;
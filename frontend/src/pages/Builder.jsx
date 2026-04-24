import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const steps = [
  {
    title: "Create Resume",
    desc: "Build your resume with live preview",
    icon: "📝",
    gradient: "from-violet-500 to-fuchsia-500",
    bg: "from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20",
    border: "border-violet-200 dark:border-violet-700/50",
    page: "resume",
    pro: false,
  },
  {
    title: "Analyze Job Description",
    desc: "Paste JD and extract key keywords",
    icon: "🔍",
    gradient: "from-blue-500 to-cyan-500",
    bg: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    border: "border-blue-200 dark:border-blue-700/50",
    page: "jd-analysis",
    pro: true,
  },
  {
    title: "Improve Resume",
    desc: "AI rewrites your content",
    icon: "✨",
    gradient: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
    border: "border-amber-200 dark:border-amber-700/50",
    page: "improve-resume",
    pro: true,
  },
  {
    title: "Check ATS Score",
    desc: "See how well your resume matches",
    icon: "📊",
    gradient: "from-emerald-500 to-teal-500",
    bg: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
    border: "border-emerald-200 dark:border-emerald-700/50",
    page: "ats-score",
    pro: false,
  },
  {
    title: "Generate Cover Letter",
    desc: "Create a matching cover letter",
    icon: "💌",
    gradient: "from-pink-500 to-rose-500",
    bg: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
    border: "border-pink-200 dark:border-pink-700/50",
    page: "cover-letter",
    pro: true,
  },
  {
    title: "Upgrade to Pro",
    desc: "Unlock templates & unlimited builds",
    icon: "⭐",
    gradient: "from-yellow-500 to-amber-500",
    bg: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
    border: "border-yellow-200 dark:border-yellow-700/50",
    page: "pricing",
  },
  {
    title: "My Dashboard",
    desc: "View and manage saved resumes",
    icon: "🗂️",
    gradient: "from-indigo-500 to-violet-500",
    bg: "from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20",
    border: "border-indigo-200 dark:border-indigo-700/50",
    page: "dashboard",
  },
];

function Builder({ setCurrentPage, isPro }) {
  const [selectedStep, setSelectedStep] = useState("");

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50/40 to-violet-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Navbar onBack={() => setCurrentPage("home")} showBack />

      <div className="px-4 sm:px-10 py-10">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
            Workspace
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            CareerForge{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Workspace
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            Build your career documents step by step
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              onClick={() => {
                if (step.pro && !isPro) {
                  setCurrentPage("pricing");
                } else {
                  step.page ? setCurrentPage(step.page) : setSelectedStep(step.title);
                }
              }}
              className={`cursor-pointer bg-gradient-to-br ${step.bg} border ${step.border} rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden ${step.pro && !isPro ? 'opacity-75' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/60 dark:bg-black/20 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">
                {index + 1}
              </div>

              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-2xl mb-5 shadow-md`}
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.icon}
              </motion.div>

              {step.pro && (
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold shadow-sm">
                    PRO
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {step.desc}
              </p>

              <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/70 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300">
                →
              </div>
            </motion.div>
          ))}
        </div>

        {selectedStep && (
          <motion.div
            className="mt-10 max-w-7xl mx-auto bg-white/90 dark:bg-gray-800/90 rounded-3xl p-8 shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {selectedStep}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              This feature is coming soon. Stay tuned! 🚀
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Builder;
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Pricing = ({ setCurrentPage, isPro, upgradeToPro }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "Forever",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500",
      badge: "Get Started",
      features: [
        "Create 1 resume",
        "JD Analysis (basic)",
        "ATS Score check",
        "Basic cover letter",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "9.99",
      period: "per month",
      icon: "⭐",
      color: "from-yellow-500 to-amber-500",
      badge: "Popular",
      features: [
        "Unlimited resumes",
        "Advanced JD Analysis",
        "Real-time ATS scoring",
        "AI-powered cover letters",
        "Resume templates",
        "Priority email support",
        "Download as PDF/Word",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      icon: "👑",
      color: "from-purple-500 to-pink-500",
      badge: "For Teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Advanced analytics",
        "API access",
        "Custom branding",
        "Dedicated support",
        "SLA guarantee",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/80 to-pink-50/80 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <Navbar onBack={() => setCurrentPage("home")} showBack />

      <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your career growth. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-3xl backdrop-blur-sm transition-all duration-300 ${
                plan.highlighted
                  ? "md:scale-105 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-300 dark:border-yellow-700 shadow-2xl"
                  : "bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-5xl mb-4">{plan.icon}</div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <span className="text-4xl font-black text-violet-600 dark:text-violet-400">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    {plan.period}
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (plan.name === "Pro" && !isPro) {
                      setSelectedPlan(plan);
                      setShowPaymentModal(true);
                    } else if (plan.name === "Free") {
                      setCurrentPage("home");
                    } else {
                      setCurrentPage("home");
                    }
                  }}
                  className={`w-full py-3 rounded-xl font-bold transition-all active:scale-95 mb-8 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-500/30 hover:shadow-xl"
                      : "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/20"
                  }`}
                >
                  {plan.name === "Free" ? "Get Started" : isPro && plan.name === "Pro" ? "Current Plan" : "Upgrade Now"}
                </button>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    What you get:
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200"
                      >
                        <span className="text-lg">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Yes! You can cancel your subscription at any time without any
                penalties.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Yes, start with our Free plan and upgrade whenever you're ready.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Do you offer team plans?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Yes, contact our sales team for Enterprise pricing and features.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We accept all major credit cards, PayPal, and bank transfers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Footer */}
        <motion.div
          className="text-center bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-3xl p-8 text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-3">Ready to take your career to the next level?</h2>
          <p className="mb-6 text-white/90">
            Join thousands of professionals building ATS-friendly resumes with CareerForge.
          </p>
          <button
            onClick={() => setCurrentPage("home")}
            className="bg-white text-violet-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-lg"
          >
            Get Started Now
          </button>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">⭐</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Upgrade to {selectedPlan.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Unlock all Pro features instantly
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Plan</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Price</span>
                  <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                    ${selectedPlan.price}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                      {selectedPlan.period}
                    </span>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Methods</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-violet-300 dark:hover:border-violet-600 transition-colors">
                    <span className="text-lg">💳</span>
                    <span className="text-sm font-medium">Credit Card</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-violet-300 dark:hover:border-violet-600 transition-colors">
                    <span className="text-lg">🅿️</span>
                    <span className="text-sm font-medium">PayPal</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-violet-300 dark:hover:border-violet-600 transition-colors">
                    <span className="text-lg">🏦</span>
                    <span className="text-sm font-medium">Bank Transfer</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-violet-300 dark:hover:border-violet-600 transition-colors">
                    <span className="text-lg">📱</span>
                    <span className="text-sm font-medium">Digital Wallet</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    upgradeToPro();
                    setShowPaymentModal(false);
                    setCurrentPage("dashboard");
                  }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
                >
                  Pay Now
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                Secure payment powered by Stripe • 30-day money-back guarantee
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Pricing;

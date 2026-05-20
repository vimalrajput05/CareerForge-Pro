import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  Crown,
  Rocket,
  Star,
  ShieldCheck,
  X,
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  HelpCircle,
  Zap,
} from "lucide-react";

const Pricing = ({ setCurrentPage, isPro, upgradeToPro }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "Forever",
      icon: Rocket,
      emoji: "🚀",
      color: "from-blue-500 to-cyan-500",
      buttonColor: "from-violet-600 to-purple-600",
      badge: "Get Started",
      description: "Perfect for students starting their resume journey.",
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
      icon: Star,
      emoji: "⭐",
      color: "from-yellow-500 to-amber-500",
      buttonColor: "from-amber-500 to-orange-500",
      badge: "Most Popular",
      description: "Best for serious job seekers and internship hunters.",
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
      icon: Crown,
      emoji: "👑",
      color: "from-purple-500 to-pink-500",
      buttonColor: "from-violet-600 to-fuchsia-500",
      badge: "For Teams",
      description: "Built for teams, placement cells, and organizations.",
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

  const faqs = [
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes! You can cancel your subscription at any time without any penalties.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, start with our Free plan and upgrade whenever you're ready.",
    },
    {
      question: "Do you offer team plans?",
      answer:
        "Yes, contact our sales team for Enterprise pricing and features.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, bank transfers, and digital wallets.",
    },
  ];

  const handlePlanClick = (plan) => {
    if (plan.name === "Pro" && !isPro) {
      setSelectedPlan(plan);
      setShowPaymentModal(true);
    } else if (plan.name === "Free") {
      setCurrentPage("home");
    } else {
      setCurrentPage("home");
    }
  };

  const handleUpgrade = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment setup failed. Please try again.");
      }
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Could not connect to payment server. Make sure backend is running on port 5000.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-all duration-300">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-24 left-10 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-96 right-10 h-80 w-80 rounded-full bg-fuchsia-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-32 left-1/2 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />

      <Navbar onBack={() => setCurrentPage("builder")} showBack />

      <main className="relative z-10 px-4 sm:px-8 py-10 max-w-7xl mx-auto">
        {/* Hero */}
        <motion.section
          className="text-center mb-14"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 dark:bg-violet-500/10 px-5 py-2 text-sm font-bold text-violet-700 dark:text-violet-300 mb-5 border border-violet-200 dark:border-violet-500/20">
            <Sparkles className="h-4 w-4" />
            Flexible plans for every career stage
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-950 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your career growth. Upgrade when you are
            ready. Cancel anytime.
          </p>

          <div className="mt-8 mx-auto flex w-fit items-center gap-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 shadow-lg border border-white dark:border-gray-700">
            <span className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-bold text-white shadow-md">
              Monthly
            </span>
            <span className="px-5 py-2 text-sm font-bold text-gray-500 dark:text-gray-300">
              Yearly
            </span>
            <span className="hidden sm:inline rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
              Save 20%
            </span>
          </div>
        </motion.section>

        {/* Pricing Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className={`group relative rounded-[2rem] backdrop-blur-xl transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-900/20 dark:via-gray-800 dark:to-orange-900/20 border-2 border-amber-400 shadow-2xl shadow-amber-200/60 dark:shadow-black/30 md:scale-105"
                    : "bg-white/90 dark:bg-gray-800/90 border border-white dark:border-gray-700 shadow-xl hover:shadow-2xl"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-black text-white shadow-xl">
                      <Zap className="h-4 w-4" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {!plan.highlighted && (
                  <div className="absolute top-5 right-5 rounded-full bg-violet-50 dark:bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-600 dark:text-violet-300">
                    {plan.badge}
                  </div>
                )}

                <div className="p-8">
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${plan.color} shadow-lg group-hover:rotate-6 transition`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-3xl font-black text-gray-950 dark:text-white mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="mb-7 flex items-end gap-2">
                    <span className="text-5xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                      {plan.price === "Custom" ? "$Custom" : `$${plan.price}`}
                    </span>
                    <span className="pb-2 text-gray-500 dark:text-gray-400">
                      {plan.period}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full rounded-2xl bg-gradient-to-r ${plan.buttonColor} px-6 py-4 font-black text-white shadow-lg transition-all duration-300 active:scale-95 hover:scale-[1.02] ${
                      plan.highlighted
                        ? "shadow-amber-400/30 hover:shadow-xl"
                        : "shadow-violet-400/25 hover:shadow-xl"
                    }`}
                  >
                    {plan.name === "Free"
                      ? "Get Started"
                      : isPro && plan.name === "Pro"
                      ? "Current Plan"
                      : "Upgrade Now"}
                  </button>

                  <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <p className="text-sm font-black text-gray-950 dark:text-white mb-4">
                      What you get:
                    </p>

                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-200"
                        >
                          <CheckCircle2
                            className={`mt-0.5 h-5 w-5 shrink-0 ${
                              plan.highlighted
                                ? "text-amber-500"
                                : "text-violet-600"
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Trust strip */}
        <motion.section
          className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 p-5 shadow-lg border border-white dark:border-gray-700">
            <ShieldCheck className="mb-3 h-7 w-7 text-violet-600" />
            <h3 className="font-black text-gray-950 dark:text-white">
              Secure Payments
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Safe and protected checkout experience.
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 p-5 shadow-lg border border-white dark:border-gray-700">
            <Sparkles className="mb-3 h-7 w-7 text-fuchsia-600" />
            <h3 className="font-black text-gray-950 dark:text-white">
              AI Powered
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Smart tools for resumes and cover letters.
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 p-5 shadow-lg border border-white dark:border-gray-700">
            <CheckCircle2 className="mb-3 h-7 w-7 text-emerald-600" />
            <h3 className="font-black text-gray-950 dark:text-white">
              Cancel Anytime
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              No long-term commitment needed.
            </p>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          className="rounded-[2rem] bg-white/90 dark:bg-gray-800/90 p-8 shadow-xl border border-white dark:border-gray-700 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-500/10">
              <HelpCircle className="h-6 w-6 text-violet-600 dark:text-violet-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl bg-gradient-to-br from-white to-violet-50/60 dark:from-gray-900 dark:to-gray-800 p-6 shadow-md border border-gray-100 dark:border-gray-700 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="font-black text-gray-950 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Footer */}
        <motion.section
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-8 py-14 text-center text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="absolute -top-20 left-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 right-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />

          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Ready to take your career to the next level?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-white/90 text-lg">
              Join thousands of professionals building ATS-friendly resumes with
              CareerForge.
            </p>

            <button
              onClick={() => setCurrentPage("home")}
              className="rounded-2xl bg-white px-10 py-4 font-black text-violet-700 shadow-xl transition hover:scale-105 hover:bg-violet-50 active:scale-95"
            >
              Get Started Now
            </button>
          </div>
        </motion.section>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl max-w-md w-full border border-white dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-violet-600 to-fuchsia-500" />

            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute right-5 top-5 z-20 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition hover:bg-white/30"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative z-10 p-8">
              <div className="text-center mb-7 pt-6">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl">
                  <Star className="h-10 w-10 text-amber-500" />
                </div>

                <h2 className="text-2xl font-black text-gray-950 dark:text-white mb-2">
                  Upgrade to {selectedPlan.name}
                </h2>

                <p className="text-gray-600 dark:text-gray-300">
                  Unlock all Pro features instantly.
                </p>
              </div>

              <div className="rounded-3xl bg-gray-50 dark:bg-gray-700/80 p-5 mb-6 border border-gray-100 dark:border-gray-600">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 dark:text-gray-300">Plan</span>
                  <span className="font-black text-gray-950 dark:text-white">
                    {selectedPlan.name}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Price
                  </span>
                  <span className="text-2xl font-black text-violet-600 dark:text-violet-400">
                    ${selectedPlan.price}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                      {selectedPlan.period}
                    </span>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-black text-gray-950 dark:text-white mb-4">
                  Payment Methods
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-600 p-3 transition hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10">
                    <CreditCard className="h-5 w-5 text-violet-600" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                      Card
                    </span>
                  </button>

                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-600 p-3 transition hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10">
                    <Wallet className="h-5 w-5 text-violet-600" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                      PayPal
                    </span>
                  </button>

                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-600 p-3 transition hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10">
                    <Building2 className="h-5 w-5 text-violet-600" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                      Bank
                    </span>
                  </button>

                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-600 p-3 transition hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10">
                    <Smartphone className="h-5 w-5 text-violet-600" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                      Wallet
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-600 px-4 py-3 font-bold text-gray-700 dark:text-gray-200 transition hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    handleUpgrade();
                  }}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 font-black text-white shadow-lg transition hover:scale-[1.02] active:scale-95"
                >
                  Pay Now
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-5">
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
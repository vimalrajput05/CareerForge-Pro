import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, ShieldCheck, X } from "lucide-react";

const CreateAccount = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("careerforgeUser", JSON.stringify(formData));
    alert("Account created successfully!");
    setCurrentPage("login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-xl rounded-[2rem] bg-white p-8 sm:p-10 shadow-2xl">
        <button
          onClick={() => setCurrentPage("home")}
          className="absolute -top-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-700 shadow-xl hover:scale-105 transition"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900">
            Create Account ✨
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            Start building your career dashboard
          </p>
        </div>

        <form onSubmit={handleCreateAccount} className="space-y-5">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 focus-within:border-violet-500 transition">
            <User className="h-6 w-6 text-slate-400" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 focus-within:border-violet-500 transition">
            <Mail className="h-6 w-6 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 focus-within:border-violet-500 transition">
            <Lock className="h-6 w-6 text-slate-400" />
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 focus-within:border-violet-500 transition">
            <Lock className="h-6 w-6 text-slate-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-4 text-lg font-bold text-white shadow-lg hover:scale-[1.02] transition"
          >
            Create Account
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <p className="mt-7 text-center text-slate-500">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("login")}
            className="font-semibold text-violet-600 underline hover:text-fuchsia-600 transition"
          >
            Login
          </button>
        </p>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <div className="flex items-center justify-center gap-3 text-sm text-slate-400">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            Secure account creation with local storage
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
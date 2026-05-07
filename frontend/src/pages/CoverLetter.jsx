import React, { useState } from "react";
import Navbar from "../components/Navbar";

const CoverLetter = ({ setCurrentPage, setCoverLetters }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [yourName, setYourName] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateLetter = async () => {
    if (!jobDescription.trim() || !companyName.trim() || !position.trim() || !yourName.trim()) {
      alert("Please fill in all fields")
      return
    }
    try {
      setLoading(true)
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{
            role: "user",
            content: `Write a professional cover letter for the following:\nName: ${yourName}\nPosition: ${position}\nCompany: ${companyName}\nJob Description: ${jobDescription}\n\nWrite a compelling 3 paragraph cover letter. Return only the letter text, no subject line, no extra explanation.`
          }],
          max_tokens: 800
        })
      })
      const data = await response.json()
      setGeneratedLetter(data.choices[0].message.content)
    } catch (err) {
      alert("Generation failed. Check your VITE_GROQ_API_KEY in .env file.")
    } finally {
      setLoading(false)
    }
  };

  const handleSaveToDashboard = () => {
    if (!generatedLetter.trim()) {
      alert("Please generate a cover letter first");
      return;
    }

    const newLetter = {
      id: Date.now(),
      title: `Cover Letter - ${position} at ${companyName}`,
      content: generatedLetter,
      date: "Just now",
    };

    setCoverLetters((prev) => [newLetter, ...prev]);
    alert("Cover Letter saved to Dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/80 to-pink-50/80 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <Navbar onBack={() => setCurrentPage("builder")} showBack />

      <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Generate Cover Letter
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Create a professional cover letter tailored to your job description.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Your Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Position Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Software Engineer"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Google, Microsoft"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-3 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Job Description
                </label>
                <textarea
                  rows="8"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <button
                onClick={handleGenerateLetter}
                disabled={loading}
                className="w-full px-5 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Generating...
                  </>
                ) : "Generate Cover Letter"}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 h-fit sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Preview
            </h2>

            {generatedLetter ? (
              <div>
                <div className="bg-slate-50 dark:bg-gray-700/50 rounded-2xl p-4 mb-6 max-h-96 overflow-y-auto text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                  {generatedLetter}
                </div>

                <button
                  onClick={handleSaveToDashboard}
                  className="w-full px-5 py-3 bg-white dark:bg-gray-900 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-700 rounded-xl font-bold hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all active:scale-95"
                >
                  Save to Dashboard
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                Fill in your information and job description, then click Generate to see your cover letter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;

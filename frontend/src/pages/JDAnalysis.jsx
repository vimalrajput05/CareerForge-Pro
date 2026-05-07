import React, { useState } from "react";
import Navbar from "../components/Navbar";

const JDAnalysis = ({ setCurrentPage, setJdAnalyses }) => {
  const [jd, setJd] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!jd.trim()) {
      alert("Please paste Job Description")
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
            content: `Analyze this job description and return ONLY a JSON object with no extra text:\n{\n  "keywords": ["top 10 important keywords"],\n  "skills": ["technical skills found"],\n  "experience": "experience requirement like 2 years or Not mentioned"\n}\n\nJob Description: ${jd}`
          }],
          max_tokens: 500
        })
      })
      const data = await response.json()
      const text = data.choices[0].message.content
      const clean = text.replace(/```json|```/g, "").trim()
      const parsed = JSON.parse(clean)
      setKeywords(parsed.keywords || [])
      setSkills(parsed.skills || [])
      setExperience(parsed.experience || "Not mentioned")
    } catch (err) {
      alert("Analysis failed. Check your VITE_GROQ_API_KEY in .env file.")
    } finally {
      setLoading(false)
    }
  };

  const handleSaveToDashboard = () => {
    if (keywords.length === 0) {
      alert("Please analyze JD first");
      return;
    }

    const summary = [
      `Experience Required: ${experience}`,
      `Skills Found: ${skills.length > 0 ? skills.join(", ") : "No major skills detected"}`,
      `Top Keywords: ${keywords.join(", ")}`,
    ].join("\n");

    const newAnalysis = {
      id: Date.now(),
      title: `JD Analysis ${new Date().toLocaleDateString()}`,
      date: "Just now",
      details: summary,
      content: summary,
      type: "JD Analysis",
    };

    setJdAnalyses((prev) => [newAnalysis, ...prev]);
    alert("JD Analysis saved to Dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/80 to-pink-50/80 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <Navbar onBack={() => setCurrentPage("builder")} showBack />

      <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          JD Analysis
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Paste a job description and get AI-powered keyword, skills, and experience insights.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              What this task will do
            </h2>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc pl-5">
              <li>Extract important keywords from the JD using AI</li>
              <li>Detect technical and soft skills with context</li>
              <li>Find required experience and qualifications</li>
              <li>Provide a concise role summary</li>
            </ul>

            <textarea
              rows="12"
              placeholder="Paste Job Description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="w-full mt-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 outline-none focus:ring-2 focus:ring-violet-500"
            />

            {error && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-4 px-5 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Analyzing...
                </>
              ) : "Analyze JD"}
            </button>

            <button
              onClick={handleSaveToDashboard}
              className="mt-3 ml-3 px-5 py-3 bg-white dark:bg-gray-900 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-700 rounded-xl font-bold hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all active:scale-95"
            >
              Save to Dashboard
            </button>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Analysis Result
            </h2>

            {keywords.length > 0 ? (
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Keywords</h3>
                <ul className="mt-2 mb-5 flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-200">
                  {keywords.map((word, index) => (
                    <li
                      key={index}
                      className="bg-violet-50 dark:bg-violet-900/30 rounded-lg px-3 py-2"
                    >
                      {word}
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold text-gray-900 dark:text-white">Skills Found</h3>
                <ul className="mt-2 mb-5 flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-200">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <li
                        key={index}
                        className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-3 py-2"
                      >
                        {skill}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 dark:text-gray-400">
                      No major skills detected
                    </li>
                  )}
                </ul>

                <h3 className="font-bold text-gray-900 dark:text-white">
                  Experience Required
                </h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2 inline-block">
                  {experience}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Results will appear here after you click Analyze JD.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JDAnalysis;


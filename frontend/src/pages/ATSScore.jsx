import React, { useState } from "react";
import Navbar from "../components/Navbar";

const ATSScore = ({ setCurrentPage, setAtsScores }) => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [score, setScore] = useState(0);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [analysis, setAnalysis] = useState("");

  const handleCalculateScore = () => {
    if (!resume.trim() || !jobDescription.trim()) {
      alert("Please paste both resume and job description");
      return;
    }

    const resumeText = resume.toLowerCase();
    const jdText = jobDescription.toLowerCase();

    // Extract keywords from JD
    const jdWords = jdText
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .split(" ")
      .filter(
        (word) =>
          word.length > 4 &&
          ![
            "about",
            "which",
            "their",
            "there",
            "these",
            "those",
            "with",
            "have",
            "this",
            "that",
            "from",
            "your",
            "will",
            "should",
            "could",
            "would",
            "where",
            "when",
          ].includes(word)
      );

    const uniqueJdKeywords = [...new Set(jdWords)].slice(0, 20);

    // Find matched and missing keywords
    const matched = uniqueJdKeywords.filter((keyword) =>
      resumeText.includes(keyword)
    );
    const missing = uniqueJdKeywords.filter(
      (keyword) => !resumeText.includes(keyword)
    );

    // Calculate score
    const calculatedScore =
      Math.round((matched.length / uniqueJdKeywords.length) * 100) || 0;

    setScore(calculatedScore);
    setMatchedKeywords(matched);
    setMissingKeywords(missing);

    // Generate analysis
    let analysisText = `Your resume has a ${calculatedScore}% ATS compatibility score.\n\n`;
    if (calculatedScore >= 80) {
      analysisText +=
        "✅ Excellent match! Your resume should pass ATS filters.\n";
    } else if (calculatedScore >= 60) {
      analysisText +=
        "⚠️ Good match, but consider adding missing keywords to improve compatibility.\n";
    } else {
      analysisText +=
        "🔴 Low match. Add more keywords from the job description to improve your chances.\n";
    }

    analysisText += `\nMatched Keywords: ${matched.length}/${uniqueJdKeywords.length}`;
    setAnalysis(analysisText);
  };

  const handleSaveToDashboard = () => {
    if (score === 0) {
      alert("Please calculate ATS score first");
      return;
    }

    const summary = [
      `ATS Score: ${score}%`,
      `Matched Keywords: ${matchedKeywords.length}`,
      `Missing Keywords: ${missingKeywords.length}`,
      `Top Matched: ${matchedKeywords.slice(0, 5).join(", ")}`,
      `Top Missing: ${missingKeywords.slice(0, 5).join(", ")}`,
    ].join("\n");

    const newScore = {
      id: Date.now(),
      title: `ATS Score ${score}% - ${new Date().toLocaleDateString()}`,
      date: "Just now",
      details: summary,
      content: summary,
      type: "ATS Score",
    };

    setAtsScores((prev) => [newScore, ...prev]);
    alert("ATS Score saved to Dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/80 to-pink-50/80 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <Navbar onBack={() => setCurrentPage("home")} showBack />

      <div className="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          ATS Score Checker
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Paste your resume and job description to check compatibility.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Input */}
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Your Resume
              </h2>
              <textarea
                rows="8"
                placeholder="Paste your resume content here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Job Description Input */}
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Job Description
              </h2>
              <textarea
                rows="8"
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <button
              onClick={handleCalculateScore}
              className="w-full px-5 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all active:scale-95"
            >
              Calculate ATS Score
            </button>
          </div>

          {/* Score Result Section */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 h-fit sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Score Result
            </h2>

            {score > 0 ? (
              <div>
                <div className="text-center mb-6">
                  <div className="text-6xl font-black text-violet-600 dark:text-violet-400">
                    {score}%
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Compatibility Score
                  </p>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Matched Keywords
                    </p>
                    <p className="text-violet-600 dark:text-violet-400 font-bold">
                      {matchedKeywords.length} found
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Missing Keywords
                    </p>
                    <p className="text-red-600 dark:text-red-400 font-bold">
                      {missingKeywords.length} missing
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-gray-700/50 rounded-2xl p-4 mb-6 text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">
                  {analysis}
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
                Enter resume and job description, then click Calculate to see your ATS score.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSScore;

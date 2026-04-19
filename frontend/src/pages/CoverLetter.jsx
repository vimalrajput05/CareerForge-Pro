import React, { useState } from "react";
import Navbar from "../components/Navbar";

const CoverLetter = ({ setCurrentPage, setCoverLetters }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [yourName, setYourName] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");

  const handleGenerateLetter = () => {
    if (!jobDescription.trim() || !companyName.trim() || !position.trim() || !yourName.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Extract key skills from job description
    const jdText = jobDescription.toLowerCase();
    const skillKeywords = [
      "communication",
      "leadership",
      "problem-solving",
      "teamwork",
      "creativity",
      "innovation",
      "technical",
      "management",
      "collaboration",
      "strategic",
    ];

    const matchedSkills = skillKeywords.filter((skill) => jdText.includes(skill));

    // Generate cover letter
    const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${position} position at ${companyName}. With my professional background and passion for excellence, I am confident that I would be a valuable addition to your team.

In my career, I have developed expertise in several key areas mentioned in your job description, including ${matchedSkills.length > 0 ? matchedSkills.slice(0, 3).join(", ") : "cross-functional collaboration and project management"}. I am particularly drawn to this role because of your company's commitment to innovation and excellence, values that align closely with my own professional philosophy.

Throughout my experience, I have consistently demonstrated the ability to deliver results, take initiative, and contribute meaningfully to team success. I am excited about the opportunity to bring these skills and my enthusiasm to ${companyName}, and I am confident that together we can achieve great things.

Thank you for considering my application. I would welcome the opportunity to discuss how my background, skills, and passion make me an excellent fit for this position. I look forward to hearing from you.

Sincerely,
${yourName}`;

    setGeneratedLetter(letter);
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
                className="w-full px-5 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all active:scale-95"
              >
                Generate Cover Letter
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

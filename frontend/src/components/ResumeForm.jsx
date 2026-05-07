import { useState } from "react";

function ResumeForm({
  resumeData,
  setResumeData,
  handleDownloadPDF,
  handleDownloadWord,
  mode = "create",
  isPro,
  setCurrentPage,
}) {
  const [improvingField, setImprovingField] = useState(null);
  const [pastedResume, setPastedResume] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const handleDownloadClick = () => {
    if (resumeData.template === "template4" && !isPro) {
      alert("Premium template download is available only for Pro users.");
      setCurrentPage("pricing");
      return;
    }

    handleDownloadPDF();
  };

  const handleAIImprove = async (fieldName, fieldValue) => {
    if (!fieldValue.trim()) {
      alert("Please add some content first before improving.");
      return;
    }
    try {
      setImprovingField(fieldName);
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
            content: `Rewrite this resume ${fieldName} section to sound more professional and impactful. Keep it concise. Return only the rewritten text, no explanation:\n\n${fieldValue}`
          }],
          max_tokens: 500
        })
      });
      const data = await response.json();
      const improved = data.choices[0].message.content;
      setResumeData({ ...resumeData, [fieldName]: improved });
    } catch (err) {
      alert("AI improve failed. Check your VITE_GROQ_API_KEY in .env file.");
    } finally {
      setImprovingField(null);
    }
  };

  const handleImproveResume = async () => {
    if (!pastedResume.trim()) {
      alert("Please paste your resume first")
      return
    }
    try {
      setExtracting(true)
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
            content: `You are a professional resume editor. Improve this resume and extract fields. Return ONLY a JSON object with no extra text:\n{\n  "name": "",\n  "role": "",\n  "email": "",\n  "phone": "",\n  "address": "",\n  "skills": "",\n  "experience": "",\n  "projects": "",\n  "certifications": ""\n}\n\nResume: ${pastedResume}`
          }],
          max_tokens: 1000
        })
      })
      const data = await response.json()
      const text = data.choices[0].message.content
      const clean = text.replace(/```json|```/g, "").trim()
      const parsed = JSON.parse(clean)
      setResumeData({ ...resumeData, ...parsed })
      setExtracted(true)
    } catch (err) {
      alert("AI improve failed. Check your VITE_GROQ_API_KEY in .env file.")
    } finally {
      setExtracting(false)
    }
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:focus:ring-violet-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 shadow-sm text-sm";

  const textareaClass = `${inputClass} resize-vertical h-24`;

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
        Resume Details
      </h2>

      <div className="space-y-3">
        {mode === "improve" && (
          <div className="space-y-3">
            <div className="rounded-3xl border border-violet-200/70 dark:border-violet-700/50 bg-violet-50/80 dark:bg-violet-900/20 p-5 shadow-sm">
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">
                Paste your full resume below and CareerForge AI will extract and improve all fields automatically.
              </p>
              <textarea
                rows="6"
                placeholder="Paste your full resume text here..."
                value={pastedResume}
                onChange={(e) => setPastedResume(e.target.value)}
                className={`${textareaClass} h-auto`}
              />
              <button
                type="button"
                onClick={handleImproveResume}
                disabled={extracting}
                className="mt-3 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-4 py-2.5 text-sm font-semibold hover:from-violet-700 hover:to-fuchsia-600 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {extracting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Improving with AI...
                  </>
                ) : extracted ? "✅ Improved! Paste again to re-improve" : "✨ AI Improve Resume"}
              </button>
            </div>
          </div>
        )}

        {/* Template Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
            Template{" "}
            {isPro && (
              <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-bold">
                PRO
              </span>
            )}
          </label>

          <select
            name="template"
            value={resumeData.template}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="template1">Template 1 — Classic Header</option>
            <option value="template2">Template 2 — Sidebar</option>
            <option value="template3">Template 3 — Minimal Card</option>
            <option value="template4">Premium Executive 👑</option>
          </select>

          {!isPro && resumeData.template === "template4" && (
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2 font-semibold">
              Premium template can be previewed, but download requires Pro.
            </p>
          )}
        </div>

        {/* Profile Photo */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
            Profile Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                const imageURL = URL.createObjectURL(file);
                setResumeData({ ...resumeData, profilePic: imageURL });
              }
            }}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 rounded-xl text-gray-900 dark:text-white text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-900/40 dark:file:text-violet-300 cursor-pointer"
          />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Full Name *
            </label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={resumeData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Job Role
            </label>

            <input
              type="text"
              name="role"
              placeholder="Frontend Developer"
              value={resumeData.role}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="john@email.com"
              value={resumeData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={resumeData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
            Location
          </label>

          <input
            type="text"
            name="address"
            placeholder="Mumbai, Maharashtra"
            value={resumeData.address}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Detailed sections */}
        {[
          {
            name: "skills",
            label: "Skills",
            placeholder: "React, Node.js, Python, SQL...",
          },
          {
            name: "experience",
            label: "Experience",
            placeholder:
              "Company Name — Role (Year)\nDescribe your responsibilities...",
          },
          {
            name: "projects",
            label: "Projects & Achievements",
            placeholder: "Project Name — Brief description\nTech used, impact...",
          },
          {
            name: "certifications",
            label: "Education & Certifications",
            placeholder:
              "B.Tech CSE — XYZ University (2022)\nAWS Certified...",
          },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              {label}
            </label>

            <textarea
              name={name}
              placeholder={placeholder}
              value={resumeData[name]}
              onChange={handleChange}
              className={textareaClass}
            />

            {(name === "skills" || name === "experience") && (
              <button
                type="button"
                onClick={() => handleAIImprove(name, resumeData[name])}
                disabled={improvingField === name}
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-sm font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {improvingField === name ? "Improving with AI..." : `✨ AI Improve ${label}`}
              </button>
            )}
          </div>
        ))}

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleDownloadClick}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-md text-sm"
          >
            📄{" "}
            {resumeData.template === "template4" && !isPro
              ? "Unlock Premium Download"
              : mode === "improve"
              ? "Download Improved Resume"
              : "Download Resume as PDF"}
          </button>

          {handleDownloadWord && (
            <button
              type="button"
              onClick={handleDownloadWord}
              className="w-full border border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 px-6 py-3.5 rounded-xl font-semibold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-all duration-300 text-sm"
            >
              📝 Download Resume as Word
            </button>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
            💡 For best results, use Chrome browser for PDF download
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;
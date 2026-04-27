import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Upload,
  FileText,
  Sparkles,
  BarChart3,
  FileSearch,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Target,
  ChevronLeft,
} from "lucide-react";
const ATSScore = ({ setCurrentPage, setAtsScores }) => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobFile, setJobFile] = useState(null);
  const [extracting, setExtracting] = useState(false);
  const [score, setScore] = useState(0);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [improvement, setImprovement] = useState("");

  const extractTextFromPDF = async (file) => {
    try {
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString()
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ""
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map(item => item.str).join(" ")
        fullText += pageText + "\n"
      }
      return fullText.trim()
    } catch (err) {
      const data = await file.arrayBuffer()
      const uint8array = new Uint8Array(data)
      let str = ""
      for (let i = 0; i < uint8array.length; i++) {
        str += String.fromCharCode(uint8array[i])
      }
      const matches = str.match(/BT[\s\S]*?ET/g) || []
      let extractedText = ""
      matches.forEach((block) => {
        const parts = block.match(/\(([^)]+)\)/g) || []
        parts.forEach((part) => { extractedText += part.slice(1, -1) + " " })
      })
      return extractedText.trim().length > 0
        ? extractedText
        : str.replace(/[^a-zA-Z0-9\s.,@:/+-]/g, " ").trim()
    }
  };

  const extractText = async (file) => {
    if (!file) return ""
    if (file.type === "text/plain") return await file.text()
    if (file.type === "application/pdf") return await extractTextFromPDF(file)
    if (file.type.startsWith("image/")) {
      try {
        setExtracting(true)
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result.split(",")[1])
          reader.readAsDataURL(file)
        })
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.2-11b-vision-preview",
            messages: [{
              role: "user",
              content: [
                { type: "image_url", image_url: { url: `data:${file.type};base64,${base64}` }},
                { type: "text", text: "Extract all text from this resume image exactly as written. Return only the extracted text, nothing else." }
              ]
            }],
            max_tokens: 1000
          })
        })
        const data = await response.json()
        return data.choices[0].message.content
      } catch (err) {
        alert("Image extraction failed. Please paste your resume text manually.")
        return ""
      } finally {
        setExtracting(false)
      }
    }
    return ""
  };

  const calculateATSScore = async () => {
    setCalculating(true);

    if (!resume.trim() || !jobDescription.trim()) {
      alert("Please enter both resume and job description.");
      setCalculating(false);
      return;
    }

    const stopWords = [
      "the",
      "and",
      "for",
      "with",
      "you",
      "your",
      "are",
      "this",
      "that",
      "from",
      "have",
      "will",
      "our",
      "can",
      "job",
      "role",
      "work",
      "team",
      "candidate",
      "experience",
    ];

    const resumeWords = resume
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.includes(word));

    const jobWords = jobDescription
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.includes(word));

    const uniqueResumeWords = [...new Set(resumeWords)];
    const uniqueJobWords = [...new Set(jobWords)];

    const matched = uniqueJobWords.filter((word) =>
      uniqueResumeWords.includes(word)
    );

    const missing = uniqueJobWords
      .filter((word) => !uniqueResumeWords.includes(word))
      .slice(0, 15);

    const finalScore =
      uniqueJobWords.length > 0
        ? Math.round((matched.length / uniqueJobWords.length) * 100)
        : 0;

    setScore(finalScore);
    setMatchedKeywords(matched.slice(0, 15));
    setMissingKeywords(missing);

    if (finalScore >= 75) {
      setAnalysis(
        "Excellent match! Your resume contains many important keywords from the job description."
      );
    } else if (finalScore >= 50) {
      setAnalysis(
        "Good match, but you can improve your resume by adding more missing job-related keywords."
      );
    } else {
      setAnalysis(
        "Your resume needs improvement. Add more relevant skills, tools, and keywords from the job description."
      );
    }

    if (finalScore < 50) {
      setImprovement(`Your resume is missing many key terms. Add these missing keywords naturally into your experience and skills sections: ${missing.slice(0, 5).join(", ")}`)
    } else if (finalScore < 75) {
      setImprovement(`Good match! Strengthen your resume by adding these keywords: ${missing.slice(0, 3).join(", ")}`)
    } else {
      setImprovement("Excellent match! Your resume is well optimized for this job.")
    }

    if (setAtsScores) {
      setAtsScores((prev) => [
        ...prev,
        {
          score: finalScore,
          date: new Date().toLocaleDateString(),
        },
      ]);
    }

    setCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 relative overflow-hidden">
      <div className="absolute top-28 left-10 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-fuchsia-300/30 blur-3xl" />

      <Navbar setCurrentPage={setCurrentPage} />
      <div className="mb-8">
  <button
    onClick={() => setCurrentPage("builder")}
    className="inline-flex items-center gap-2 rounded-xl px-1 py-2 text-sm font-bold text-slate-600 hover:text-purple-700 transition-all duration-300"
  >
    <ChevronLeft className="h-5 w-5" />
    Back
  </button>
</div>
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700 mb-5">
            <Sparkles className="h-4 w-4" />
            Smart Resume Optimization
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-950">
            ATS Score Checker
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Upload your resume and job description to check your compatibility
            score, matched keywords, missing skills, and improvement areas.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-5 shadow-md border border-white">
              <p className="text-2xl font-black text-purple-600">ATS</p>
              <p className="text-sm text-slate-500">Friendly Analysis</p>
            </div>

            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-5 shadow-md border border-white">
              <p className="text-2xl font-black text-fuchsia-600">PDF</p>
              <p className="text-sm text-slate-500">Resume Support</p>
            </div>

            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-5 shadow-md border border-white">
              <p className="text-2xl font-black text-indigo-600">AI</p>
              <p className="text-sm text-slate-500">Smart Suggestions</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl p-8 shadow-xl border border-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Upload Resume
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Upload your resume or paste the content manually.
                  </p>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center shadow-lg">
                  <Upload className="h-7 w-7 text-white" />
                </div>
              </div>

              <label className="group block cursor-pointer rounded-3xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-fuchsia-50 p-10 text-center transition-all duration-300 hover:border-purple-500 hover:scale-[1.01]">
                <input
                  type="file"
                  accept=".pdf,.txt,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setResumeFile(file);

                    if (file) {
                      setExtracting(true);
                      extractText(file)
                        .then((text) => setResume(text))
                        .finally(() => setExtracting(false));
                    }
                  }}
                  className="hidden"
                />

                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-white flex items-center justify-center shadow-md group-hover:rotate-6 transition">
                  {extracting ? (
                    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                  ) : (
                    <Upload className="h-8 w-8 text-purple-600" />
                  )}
                </div>

                <p className="text-lg font-bold text-purple-700">
                  {resumeFile
                    ? resumeFile.name
                    : "Upload your resume as PDF, text, or image"}
                </p>

                <p className="mt-2 text-slate-500">
                  PDF uploads are preferred for better ATS scoring.
                </p>
              </label>

              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Or paste your resume content here if needed..."
                className="mt-6 min-h-[190px] w-full resize-none rounded-3xl border border-slate-200 bg-white p-5 text-slate-700 outline-none shadow-sm transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
              />
            </div>

            <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl p-8 shadow-xl border border-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Job Description
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Upload or paste the job description to compare.
                  </p>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg">
                  <FileText className="h-7 w-7 text-white" />
                </div>
              </div>

              <label className="group block cursor-pointer rounded-3xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 text-center transition-all duration-300 hover:border-indigo-500 hover:scale-[1.01] mb-6">
                <input
                  type="file"
                  accept=".pdf,.txt,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setJobFile(file);

                    if (file) {
                      setExtracting(true);
                      extractText(file)
                        .then((text) => setJobDescription(text))
                        .finally(() => setExtracting(false));
                    }
                  }}
                  className="hidden"
                />

                <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-md">
                  <FileText className="h-7 w-7 text-indigo-600" />
                </div>

                <p className="font-bold text-indigo-700">
                  {jobFile ? jobFile.name : "Upload job description file"}
                </p>
              </label>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="min-h-[220px] w-full resize-none rounded-3xl border border-slate-200 bg-white p-5 text-slate-700 outline-none shadow-sm transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
              />

              <button
                onClick={calculateATSScore}
                disabled={calculating}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-purple-300/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {calculating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate ATS Score"
                )}
              </button>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-[2rem] bg-white/90 backdrop-blur-xl p-8 shadow-2xl border border-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>

                <h2 className="text-2xl font-black text-slate-900">
                  Score Result
                </h2>
              </div>

              {score > 0 ? (
                <div>
                  <div className="text-center">
                    <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 shadow-xl">
                      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white">
                        <div>
                          <p className="text-5xl font-black text-purple-600">
                            {score}%
                          </p>
                          <p className="text-sm font-medium text-slate-500">
                            ATS Match
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-slate-600">
                      Your resume has been compared with the job description.
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl bg-green-50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <p className="font-bold text-green-700">
                          Matched Keywords
                        </p>
                      </div>

                      <p className="text-sm text-slate-600">
                        {matchedKeywords.length > 0
                          ? matchedKeywords.join(", ")
                          : "No matched keywords found yet."}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-red-50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <p className="font-bold text-red-700">
                          Missing Keywords
                        </p>
                      </div>

                      <p className="text-sm text-slate-600">
                        {missingKeywords.length > 0
                          ? missingKeywords.join(", ")
                          : "No missing keywords found."}
                      </p>
                    </div>

                    {analysis && (
                      <div className="rounded-2xl bg-purple-50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-5 w-5 text-purple-600" />
                          <p className="font-bold text-purple-700">
                            Resume Analysis
                          </p>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {analysis}
                        </p>
                      </div>
                    )}

                    {improvement && (
                      <div className="rounded-2xl bg-blue-50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-5 w-5 text-blue-600" />
                          <p className="font-bold text-blue-700">How to Improve</p>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{improvement}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-100">
                    <FileSearch className="h-10 w-10 text-purple-600" />
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    Enter resume and job description, then click Calculate to
                    see your ATS score.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default ATSScore;
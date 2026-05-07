import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

function Dashboard({
  setCurrentPage,
  onDownload,
  resumes = [],
  setResumes,
  jobs = [],
  setJobs,
  coverLetters = [],
  setCoverLetters,
  jdAnalyses = [],
  setJdAnalyses,
  atsScores = [],
  setAtsScores,
}) {
  const [activeTab, setActiveTab] = useState("resumes");
  const [selectedItem, setSelectedItem] = useState(null);

  const totalAssets =
    resumes.length +
    jobs.length +
    coverLetters.length +
    jdAnalyses.length +
    atsScores.length;

  const avgAtsScore =
    atsScores.length > 0
      ? Math.round(
          atsScores.reduce((sum, item) => {
            if (typeof item.score === "number") return sum + item.score;
            const match = item.title?.match(/\d+/);
            return sum + (match ? Number(match[0]) : 0);
          }, 0) / atsScores.length
        )
      : 85;

  const handleDelete = (id, category) => {
    if (category === "resumes") {
      setResumes(resumes.filter((item) => item.id !== id));
    }
    if (category === "jobs") {
      setJobs(jobs.filter((item) => item.id !== id));
    }
    if (category === "letters") {
      setCoverLetters(coverLetters.filter((item) => item.id !== id));
    }
    if (category === "jd") {
      setJdAnalyses(jdAnalyses.filter((item) => item.id !== id));
    }
    if (category === "ats") {
      setAtsScores(atsScores.filter((item) => item.id !== id));
    }

    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleSaveDocuments = () => {
    const allData = {
      resumes,
      jobs,
      coverLetters,
      jdAnalyses,
      atsScores,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", "careerforge-dashboard-export.json");
    linkElement.click();
  };

  const tabs = [
    { id: "resumes", label: "Resumes", count: resumes.length, icon: "📄" },
    { id: "jobs", label: "Jobs", count: jobs.length, icon: "🏢" },
    { id: "letters", label: "Letters", count: coverLetters.length, icon: "✉️" },
    { id: "jd", label: "JD Analysis", count: jdAnalyses.length, icon: "🔎" },
    { id: "ats", label: "ATS Scores", count: atsScores.length, icon: "📊" },
    { id: "all", label: "History", count: totalAssets, icon: "📚" },
  ];

  const activeTitle =
    activeTab === "letters"
      ? "Cover Letters"
      : activeTab === "jd"
      ? "JD Analysis"
      : activeTab === "ats"
      ? "ATS Scores"
      : activeTab === "all"
      ? "All History"
      : activeTab === "jobs"
      ? "Job Matches"
      : "Resumes";

  const getItemTitle = (item) => item.name || item.role || item.title || "Untitled";

  const getItemSubtitle = (item, tab) => {
    if (tab === "jobs") return item.company || "Company";
    if (tab === "ats") return item.date || "Recent ATS score";
    return item.date || "Recently updated";
  };

  const getItemType = (tab, item) => {
    if (item?.type) return item.type;
    if (tab === "jobs") return "Job Match";
    if (tab === "letters") return "Cover Letter";
    if (tab === "jd") return "JD Analysis";
    if (tab === "ats") return "ATS Score";
    return "Resume";
  };

  const listCardClass = (item) =>
    `rounded-[1.75rem] border p-5 transition-all duration-300 cursor-pointer ${
      selectedItem?.id === item.id
        ? "bg-violet-50 dark:bg-violet-900/20 border-violet-300 dark:border-violet-700 shadow-lg"
        : "bg-white/90 dark:bg-gray-800/90 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1"
    }`;

  const allItems = [
    ...resumes.map((item) => ({
      ...item,
      category: "resumes",
      icon: "📄",
      type: "Resume",
    })),
    ...jobs.map((item) => ({
      ...item,
      category: "jobs",
      icon: "🏢",
      type: "Job Match",
    })),
    ...coverLetters.map((item) => ({
      ...item,
      category: "letters",
      icon: "✉️",
      type: "Cover Letter",
    })),
    ...jdAnalyses.map((item) => ({
      ...item,
      category: "jd",
      icon: "🔎",
      type: "JD Analysis",
    })),
    ...atsScores.map((item) => ({
      ...item,
      category: "ats",
      icon: "📊",
      type: "ATS Score",
      title:
        item.title ||
        (typeof item.score === "number" ? `ATS Score ${item.score}%` : "ATS Score"),
    })),
  ];

  const renderList = () => {
    if (activeTab === "resumes") {
      return resumes.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className={listCardClass(item)}
          onClick={() => setSelectedItem(item)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-2xl">
                📄
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.name}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.date}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id, "resumes");
              }}
              className="rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition"
            >
              🗑️
            </button>
          </div>
        </motion.div>
      ));
    }

    if (activeTab === "jobs") {
      return jobs.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className={listCardClass(item)}
          onClick={() => setSelectedItem(item)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-2xl">
                🏢
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.role}
                </h4>
                <p className="mt-1 text-sm text-violet-600 dark:text-violet-300 font-semibold">
                  {item.company}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id, "jobs");
              }}
              className="rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition"
            >
              🗑️
            </button>
          </div>
        </motion.div>
      ));
    }

    if (activeTab === "letters") {
      return coverLetters.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className={listCardClass(item)}
          onClick={() => setSelectedItem(item)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-2xl">
                ✉️
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.date}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id, "letters");
              }}
              className="rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition"
            >
              🗑️
            </button>
          </div>
        </motion.div>
      ));
    }

    if (activeTab === "jd") {
      return jdAnalyses.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className={listCardClass(item)}
          onClick={() => setSelectedItem(item)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-2xl">
                🔎
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.date}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id, "jd");
              }}
              className="rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition"
            >
              🗑️
            </button>
          </div>
        </motion.div>
      ));
    }

    if (activeTab === "ats") {
      return atsScores.map((item, index) => {
        const title =
          item.title ||
          (typeof item.score === "number"
            ? `ATS Score ${item.score}%`
            : `ATS Score ${index + 1}`);

        return (
          <motion.div
            key={item.id || index}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className={listCardClass(item)}
            onClick={() => setSelectedItem({ ...item, title })}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-2xl">
                  📊
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.date || "Recently checked"}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id, "ats");
                }}
                className="rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition"
              >
                🗑️
              </button>
            </div>
          </motion.div>
        );
      });
    }

    if (activeTab === "all") {
      return allItems.map((item, index) => (
        <motion.div
          key={`${item.category}-${item.id || index}`}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className={listCardClass(item)}
          onClick={() => setSelectedItem(item)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-2xl">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {getItemTitle(item)}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {item.date || "Recent"} • {item.type}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id, item.category);
              }}
              className="rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition"
            >
              🗑️
            </button>
          </div>
        </motion.div>
      ));
    }

    return null;
  };

  const isEmpty =
    (activeTab === "resumes" && resumes.length === 0) ||
    (activeTab === "jobs" && jobs.length === 0) ||
    (activeTab === "letters" && coverLetters.length === 0) ||
    (activeTab === "jd" && jdAnalyses.length === 0) ||
    (activeTab === "ats" && atsScores.length === 0) ||
    (activeTab === "all" && totalAssets === 0);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Navbar onBack={() => setCurrentPage("builder")} showBack />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Hero */}
        <motion.div
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 p-8 sm:p-10 text-white shadow-2xl mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-100 mb-3">
                CareerForge Dashboard
              </p>
              <h1 className="text-3xl sm:text-5xl font-black">Welcome back 👋</h1>
              <p className="mt-4 max-w-2xl text-violet-100 leading-relaxed">
                Manage your resumes, ATS reports, cover letters, and analysis
                history from one elegant workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentPage("builder")}
                className="rounded-2xl bg-white px-6 py-3 font-bold text-violet-700 shadow-lg hover:scale-105 transition"
              >
                Open Builder
              </button>
              <button
                onClick={handleSaveDocuments}
                className="rounded-2xl bg-white/15 border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/25 transition"
              >
                Export Data
              </button>
            </div>
          </div>
        </motion.div>

        {/* Clean Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="rounded-[1.75rem] bg-white/90 dark:bg-gray-900/80 border border-white dark:border-gray-700 p-6 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
              Total Assets
            </p>
            <div className="mt-4 flex items-end justify-between">
              <h2 className="text-5xl font-black text-gray-900 dark:text-white">
                {totalAssets}
              </h2>
              <span className="text-3xl">📚</span>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white/90 dark:bg-gray-900/80 border border-white dark:border-gray-700 p-6 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
              Average ATS Score
            </p>
            <div className="mt-4 flex items-end justify-between">
              <h2 className="text-5xl font-black text-violet-600 dark:text-violet-300">
                {avgAtsScore}%
              </h2>
              <span className="text-3xl">📊</span>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white/90 dark:bg-gray-900/80 border border-white dark:border-gray-700 p-6 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
              Main Tools
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Resume", "ATS", "Cover Letter", "JD Analysis"].map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-violet-50 dark:bg-violet-900/20 px-3 py-1 text-sm font-semibold text-violet-700 dark:text-violet-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max rounded-[1.75rem] bg-white/85 dark:bg-gray-900/80 p-3 border border-white dark:border-gray-700 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedItem(null);
                }}
                className={`flex items-center gap-3 rounded-2xl px-5 py-3 font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-gray-800"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.9fr] gap-8">
          {/* Left */}
          <div>
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-violet-600 dark:text-violet-300 font-bold">
                  Overview
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                  {activeTitle}
                </h3>
              </div>

              <button
                onClick={() => setCurrentPage("builder")}
                className="self-start rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-violet-100 dark:border-gray-700 px-5 py-3 text-sm font-bold text-violet-700 dark:text-violet-300 shadow-sm hover:shadow-md transition"
              >
                + Create New
              </button>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">{renderList()}</AnimatePresence>

              {resumes.length === 0 && activeTab === "resumes" && (
                <div className="mt-4 rounded-[1.75rem] border-2 border-dashed border-violet-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 py-16 px-6 text-center">
                  <p className="text-4xl mb-3">📄</p>
                  <p className="font-semibold">No resumes yet</p>
                  <p className="text-sm mt-1">Create your first resume to see it here</p>
                </div>
              )}

              {coverLetters.length === 0 && activeTab === "letters" && (
                <div className="mt-4 rounded-[1.75rem] border-2 border-dashed border-violet-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 py-16 px-6 text-center">
                  <p className="text-4xl mb-3">✉️</p>
                  <p className="font-semibold">No cover letters yet</p>
                  <p className="text-sm mt-1">Generate a cover letter to see it here</p>
                </div>
              )}

              {jdAnalyses.length === 0 && activeTab === "jd" && (
                <div className="mt-4 rounded-[1.75rem] border-2 border-dashed border-violet-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 py-16 px-6 text-center">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="font-semibold">No JD analyses yet</p>
                  <p className="text-sm mt-1">Analyze a job description to see results here</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="sticky top-28 h-fit rounded-[2rem] bg-white/90 dark:bg-gray-800/90 border border-white dark:border-gray-700 p-7 shadow-xl">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                Details
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Select an item to preview its details and download it.
              </p>
            </div>

            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-flex rounded-full bg-violet-50 dark:bg-violet-900/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-violet-300">
                  {getItemType(activeTab, selectedItem)}
                </span>

                <h4 className="mt-4 text-2xl font-black text-gray-900 dark:text-white leading-tight">
                  {getItemTitle(selectedItem)}
                </h4>

                <div className="mt-5 space-y-4">
                  <div className="rounded-3xl bg-slate-50 dark:bg-gray-700/50 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
                      Summary
                    </p>
                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {selectedItem.details ||
                        selectedItem.content ||
                        "Document processed and ready for review."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-3xl bg-slate-50 dark:bg-gray-700/50 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
                        Updated
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
                        {selectedItem.date || "Just now"}
                      </p>
                    </div>

                    <div className="rounded-3xl bg-slate-50 dark:bg-gray-700/50 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
                        Category
                      </p>
                      <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
                        {getItemType(activeTab, selectedItem)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onDownload(
                      getItemTitle(selectedItem),
                      selectedItem.content || selectedItem.details
                    )
                  }
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-4 font-bold text-white shadow-lg hover:scale-[1.02] transition"
                >
                  Download Document
                </button>
              </motion.div>
            ) : (
              <div className="rounded-3xl bg-slate-50 dark:bg-gray-700/40 p-8 text-center">
                <div className="text-5xl opacity-20 mb-3">📄</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Choose a document from the left side to preview full details here.
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h4>

              <div className="space-y-3">
                <button
                  onClick={() => setCurrentPage("ats-score")}
                  className="w-full rounded-2xl bg-violet-50 dark:bg-violet-900/20 px-4 py-3 text-left font-semibold text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition"
                >
                  Run new ATS check
                </button>

                <button
                  onClick={() => setCurrentPage("cover-letter")}
                  className="w-full rounded-2xl bg-violet-50 dark:bg-violet-900/20 px-4 py-3 text-left font-semibold text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition"
                >
                  Create cover letter
                </button>

                <button
                  onClick={handleSaveDocuments}
                  className="w-full rounded-2xl bg-violet-50 dark:bg-violet-900/20 px-4 py-3 text-left font-semibold text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition"
                >
                  Export dashboard data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
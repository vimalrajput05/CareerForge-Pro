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
  setAtsScores
}) {
  const [activeTab, setActiveTab] = useState("resumes"); 
  const [selectedItem, setSelectedItem] = useState(null); 

  const totalAssets =
    resumes.length + jobs.length + coverLetters.length + jdAnalyses.length + atsScores.length;

  const avgAtsScore =
    atsScores.length > 0
      ? Math.round(
          atsScores.reduce((sum, item) => {
            const match = item.title?.match(/\d+/);
            return sum + (match ? Number(match[0]) : 0);
          }, 0) / atsScores.length
        )
      : 85;

  const handleDelete = (id, category) => {
    if (category === "resumes") setResumes(resumes.filter(item => item.id !== id));
    if (category === "jobs") setJobs(jobs.filter(item => item.id !== id));
    if (category === "letters") setCoverLetters(coverLetters.filter(item => item.id !== id));
    if (category === "jd") setJdAnalyses(jdAnalyses.filter(item => item.id !== id));
    if (category === "ats") setAtsScores(atsScores.filter(item => item.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const handleSaveDocuments = () => {
    const allData = {
      resumes,
      jobs,
      coverLetters,
      jdAnalyses,
      atsScores,
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", "careerforge-dashboard-export.json");
    linkElement.click();
  };

  const handleViewHistory = () => {
    setActiveTab("all");
    setSelectedItem(null);
  };

  const tabs = [
    { id: "resumes", label: "My Resumes", count: resumes.length, icon: "📄" },
    { id: "jobs", label: "Job Matches", count: jobs.length, icon: "🏢" },
    { id: "letters", label: "Cover Letters", count: coverLetters.length, icon: "✉️" },
    { id: "jd", label: "JD Analysis", count: jdAnalyses.length, icon: "🔎" },
    { id: "ats", label: "ATS Scores", count: atsScores.length, icon: "📊" },
    { id: "all", label: "All History", count: totalAssets, icon: "📚" },
  ];

  const listCardClass = (item) =>
    `flex items-center justify-between p-5 rounded-3xl shadow-md cursor-pointer border transition-all duration-300 ${
      selectedItem?.id === item.id
        ? "bg-violet-100 dark:bg-violet-900/40 border-violet-300"
        : "bg-white/90 dark:bg-gray-800/90 border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1"
    }`;

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 p-6 sm:p-10 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Navbar onBack={() => setCurrentPage("builder")} showBack />

      <div className="max-w-7xl mx-auto mt-6">

        {/* Premium Hero */}
        <motion.div
          className="mb-8 rounded-[2rem] bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 p-8 text-white shadow-2xl shadow-violet-500/25 overflow-hidden relative"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-100 mb-3">
                CareerForge Dashboard
              </p>
              <h1 className="text-3xl sm:text-5xl font-black">
                Welcome back 👋
              </h1>
              <p className="mt-3 text-violet-100 max-w-2xl">
                Track resumes, ATS scores, job matches, cover letters, and saved career documents from one powerful workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setCurrentPage("builder")}
                className="px-5 py-3 bg-white text-violet-700 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all active:scale-95"
              >
                Back to Workspace
              </button>
              <button 
                onClick={() => setCurrentPage("ats-score")}
                className="px-5 py-3 bg-white/15 border border-white/30 rounded-2xl font-bold text-white hover:bg-white/25 transition-all active:scale-95"
              >
                New ATS Check
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mini Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Resumes", value: resumes.length, icon: "📄" },
            { label: "ATS Reports", value: atsScores.length, icon: "📊" },
            { label: "Cover Letters", value: coverLetters.length, icon: "✉️" },
            { label: "Total Assets", value: totalAssets, icon: "📚" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-3xl bg-white/85 dark:bg-gray-900/80 backdrop-blur-lg border border-white/60 dark:border-gray-700 p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="rounded-3xl bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 p-6 shadow-lg shadow-violet-500/10 hover:-translate-y-1 transition-all">
            <h3 className="text-base font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300 mb-3">
              Workspace Status
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Track recent documents, organize resume edits, and quickly jump back to the workspace when you need to refine your resume.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white p-6 shadow-2xl shadow-violet-500/20 hover:scale-[1.02] transition-all">
            <p className="text-sm uppercase tracking-[0.2em] opacity-80 mb-2">
              Total Career Assets
            </p>
            <p className="text-5xl font-black">{totalAssets}</p>
            <p className="mt-3 text-sm text-violet-100 opacity-90">
              Saved resumes, letters, analyses, and ATS reports in one place.
            </p>
          </div>

          <div className="rounded-3xl bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 p-6 shadow-lg shadow-violet-500/10 hover:-translate-y-1 transition-all">
            <p className="text-sm uppercase tracking-[0.2em] font-semibold text-gray-500 dark:text-gray-400 mb-3">
              Average ATS Score
            </p>

            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full border-[10px] border-violet-200 dark:border-violet-900 flex items-center justify-center bg-white dark:bg-gray-800">
                <span className="text-2xl font-black text-violet-600 dark:text-violet-300">
                  {avgAtsScore}%
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Keep improving your resumes to increase ATS compatibility.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 mb-10">
          {tabs.map((tab, index) => (
            <motion.div 
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedItem(null);
              }}
              className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                activeTab === tab.id 
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-inner" 
                  : "border-transparent bg-white/90 dark:bg-gray-800/90 shadow-sm hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-md"
              }`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200 text-xl shadow-sm">
                  {tab.icon}
                </span>
                <span className="text-xs uppercase font-semibold tracking-[0.3em] text-gray-500 dark:text-gray-400">
                  {tab.label}
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-4xl font-black dark:text-white">{tab.count}</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Latest updates
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize px-1">
              Recent {activeTab === "letters" ? "Cover Letters" : activeTab === "jd" ? "JD Analysis" : activeTab === "ats" ? "ATS Scores" : activeTab}
            </h3>
            
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {activeTab === "resumes" && resumes.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={listCardClass(item)}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">📄</span>
                      <div>
                        <p className="font-semibold dark:text-white leading-tight">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
                      </div>
                    </div>
                    <button onClick={(e) => {e.stopPropagation(); handleDelete(item.id, "resumes")}} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">🗑️</button>
                  </motion.div>
                ))}

                {activeTab === "jobs" && jobs.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={listCardClass(item)}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">🏢</span>
                      <div>
                        <p className="font-semibold dark:text-white leading-tight">{item.role}</p>
                        <p className="text-sm text-violet-500 font-semibold uppercase tracking-[0.2em] mt-1">{item.company}</p>
                      </div>
                    </div>
                    <button onClick={(e) => {e.stopPropagation(); handleDelete(item.id, "jobs")}} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">🗑️</button>
                  </motion.div>
                ))}

                {activeTab === "letters" && coverLetters.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={listCardClass(item)}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">✉️</span>
                      <div>
                        <p className="font-semibold dark:text-white leading-tight">{item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
                      </div>
                    </div>
                    <button onClick={(e) => {e.stopPropagation(); handleDelete(item.id, "letters")}} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">🗑️</button>
                  </motion.div>
                ))}

                {activeTab === "jd" && jdAnalyses.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={listCardClass(item)}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">🔎</span>
                      <div>
                        <p className="font-semibold dark:text-white leading-tight">{item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
                      </div>
                    </div>
                    <button onClick={(e) => {e.stopPropagation(); handleDelete(item.id, "jd")}} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">🗑️</button>
                  </motion.div>
                ))}

                {activeTab === "ats" && atsScores.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={listCardClass(item)}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">📊</span>
                      <div>
                        <p className="font-semibold dark:text-white leading-tight">{item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
                      </div>
                    </div>
                    <button onClick={(e) => {e.stopPropagation(); handleDelete(item.id, "ats")}} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">🗑️</button>
                  </motion.div>
                ))}

                {activeTab === "all" && [
                  ...resumes.map(item => ({ ...item, category: "resumes", icon: "📄", type: "Resume" })),
                  ...jobs.map(item => ({ ...item, category: "jobs", icon: "🏢", type: "Job Match" })),
                  ...coverLetters.map(item => ({ ...item, category: "letters", icon: "✉️", type: "Cover Letter" })),
                  ...jdAnalyses.map(item => ({ ...item, category: "jd", icon: "🔎", type: "JD Analysis" })),
                  ...atsScores.map(item => ({ ...item, category: "ats", icon: "📊", type: "ATS Score" }))
                ].map(item => (
                  <motion.div key={`${item.category}-${item.id}`} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={listCardClass(item)}
                    onClick={() => setSelectedItem({ ...item, category: item.category })}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold dark:text-white leading-tight">{item.name || item.role || item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.date} • {item.type}</p>
                      </div>
                    </div>
                    <button onClick={(e) => {e.stopPropagation(); handleDelete(item.id, item.category)}} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">🗑️</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {((activeTab === "resumes" && resumes.length === 0) || 
              (activeTab === "jobs" && jobs.length === 0) || 
              (activeTab === "letters" && coverLetters.length === 0) ||
              (activeTab === "jd" && jdAnalyses.length === 0) ||
              (activeTab === "ats" && atsScores.length === 0) ||
              (activeTab === "all" && totalAssets === 0)) && (
                <div className="text-center py-16 bg-white/50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                  <p className="text-gray-400 font-medium">
                    No {activeTab === "letters" ? "Cover Letters" : activeTab === "jd" ? "JD Analysis" : activeTab === "ats" ? "ATS Scores" : activeTab === "all" ? "documents" : activeTab} available yet.
                  </p>
                </div>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-violet-100 dark:border-gray-700 h-fit sticky top-10">
            <div className="flex flex-col gap-5 mb-6">
              <div>
                <h3 className="text-xl font-bold dark:text-white">Details View</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Inspect selected documents, analysis results, and download files.
                </p>
              </div>

              {selectedItem && (
                <span className="self-start rounded-full bg-violet-50 dark:bg-violet-900/30 px-3 py-1 text-xs uppercase tracking-[0.25em] text-violet-600 dark:text-violet-200 font-semibold">
                  {selectedItem.type ? selectedItem.type : activeTab === "jobs" ? "Job Match" : activeTab === "letters" ? "Cover Letter" : activeTab === "jd" ? "JD Analysis" : activeTab === "ats" ? "ATS Score" : "Resume"}
                </span>
              )}
            </div>

            {selectedItem ? (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} key={selectedItem.id}>
                <h4 className="text-2xl font-black mb-3 dark:text-white leading-tight">
                  {selectedItem.name || selectedItem.role || selectedItem.title}
                </h4>

                <div className="grid gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
                  <div className="rounded-3xl bg-slate-50 dark:bg-gray-700/50 p-4">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">Summary</p>
                    <p className="leading-relaxed whitespace-pre-line">
                      {selectedItem.details || selectedItem.content || "Document processed and ready for distribution."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-3xl bg-slate-50 dark:bg-gray-700/50 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">Last updated</p>
                      <p className="mt-2 font-bold text-gray-900 dark:text-white">{selectedItem.date || "Just now"}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 dark:bg-gray-700/50 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">Type</p>
                      <p className="mt-2 font-bold text-gray-900 dark:text-white">{selectedItem.type ? selectedItem.type : activeTab === "jobs" ? "Job Match" : activeTab === "letters" ? "Cover Letter" : activeTab === "jd" ? "JD Analysis" : activeTab === "ats" ? "ATS Score" : "Resume"}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onDownload(selectedItem.name || selectedItem.title, selectedItem.content || selectedItem.details)}
                  className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all active:scale-95"
                >
                  Download Document
                </button>
              </motion.div>
            ) : (
              <div className="text-center py-10">
                <div className="text-5xl mb-3 opacity-20">📂</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Select an item from your list to preview details and access download options.
                </p>
              </div>
            )}

            {/* Recent Activity */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-bold mb-4 dark:text-white">Recent Activity</h3>
              <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <li>✔ Resume workspace opened</li>
                <li>✔ ATS score tools ready</li>
                <li>✔ Dashboard data synced locally</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
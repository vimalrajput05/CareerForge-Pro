import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

function Dashboard({ 
  setCurrentPage, 
  onDownload, 
  resumes, 
  setResumes, 
  jobs, 
  setJobs, 
  coverLetters, 
  setCoverLetters,
  jdAnalyses,
  setJdAnalyses,
  atsScores,
  setAtsScores
}) {
  // --- LOCAL UI STATE ---
  const [activeTab, setActiveTab] = useState("resumes"); 
  const [selectedItem, setSelectedItem] = useState(null); 

  // --- ACTIONS ---
  const handleDelete = (id, category) => {
    if (category === "resumes") setResumes(resumes.filter(item => item.id !== id));
    if (category === "jobs") setJobs(jobs.filter(item => item.id !== id));
    if (category === "letters") setCoverLetters(coverLetters.filter(item => item.id !== id));
    if (category === "jd") setJdAnalyses(jdAnalyses.filter(item => item.id !== id));
    if (category === "ats") setAtsScores(atsScores.filter(item => item.id !== id));
    
    // Deselect if the deleted item was currently viewed
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
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'careerforge-dashboard-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleViewHistory = () => {
    setActiveTab("all");
    setSelectedItem(null);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 p-6 sm:p-10 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Navbar onBack={() => setCurrentPage("builder")} showBack />
      <div className="max-w-7xl mx-auto mt-6">
        
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-sans tracking-tight">Professional Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Manage and download your career documents with clear tracking and fast access.</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
              <button 
                onClick={handleSaveDocuments}
                className="inline-flex items-center gap-2 rounded-full bg-violet-50 dark:bg-violet-900/30 px-3 py-2 font-medium text-violet-700 dark:text-violet-200 hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors cursor-pointer"
              >
                🧾 Save documents
              </button>
              <button 
                onClick={handleViewHistory}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-gray-800 px-3 py-2 font-medium hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                ✅ View all history
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setCurrentPage("builder")}
              className="px-5 py-2.5 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 shadow-lg shadow-violet-500/30 transition-all active:scale-95"
            >
              Back to Workspace
            </button>
            <button 
              onClick={() => setCurrentPage("ats-score")}
              className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-gray-700 transition-all active:scale-95"
            >
              New ATS Check
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="rounded-3xl bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 p-6 shadow-lg shadow-violet-500/10">
            <h3 className="text-base font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300 mb-3">Workspace Status</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Track your recent documents, keep your resume edits organized, and quickly jump back into the workspace when you need to refine your resume or run a new ATS check.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white p-6 shadow-xl shadow-violet-500/20">
            <p className="text-sm uppercase tracking-[0.2em] opacity-80 mb-2">Total career assets</p>
            <p className="text-4xl font-black">{resumes.length + jobs.length + coverLetters.length + jdAnalyses.length + atsScores.length}</p>
            <p className="mt-3 text-sm text-violet-100 opacity-90">All your saved resumes, letters, analyses, and ATS reports in one place.</p>
          </div>
          <div className="rounded-3xl bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 p-6 shadow-lg shadow-violet-500/10">
            <p className="text-sm uppercase tracking-[0.2em] font-semibold text-gray-500 dark:text-gray-400 mb-3">Quick actions</p>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>• Edit your latest resume directly from workspace.</p>
              <p>• Upload a new ATS report or review saved scores.</p>
              <p>• Save documents securely or export your full history.</p>
            </div>
          </div>
        </div>

        {/* Stats & Navigation Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 mb-10">
          {[
            { id: "resumes", label: "My Resumes", count: resumes.length, icon: "📄" },
            { id: "jobs", label: "Job Matches", count: jobs.length, icon: "🏢" },
            { id: "letters", label: "Cover Letters", count: coverLetters.length, icon: "✉️" },
            { id: "jd", label: "JD Analysis", count: jdAnalyses.length, icon: "🔎" },
            { id: "ats", label: "ATS Scores", count: atsScores.length, icon: "📊" },
            { id: "all", label: "All History", count: resumes.length + jobs.length + coverLetters.length + jdAnalyses.length + atsScores.length, icon: "📚" }
          ].map((tab) => (
            <div 
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedItem(null); // Reset detail view when switching categories
              }}
              className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 ${
                activeTab === tab.id 
                ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-inner" 
                : "border-transparent bg-white dark:bg-gray-800 shadow-sm hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200 text-xl shadow-sm">
                  {tab.icon}
                </span>
                <span className="text-xs uppercase font-semibold tracking-[0.3em] text-gray-500 dark:text-gray-400">{tab.label}</span>
              </div>
              <div className="mt-6">
                <h2 className="text-4xl font-black dark:text-white">{tab.count}</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Latest updates in this category</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* List View */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize px-1">
              Recent {activeTab === "letters" ? "Cover Letters" : activeTab === "jd" ? "JD Analysis" : activeTab === "ats" ? "ATS Scores" : activeTab}
            </h3>
            
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {/* RESUMES LIST */}
                {activeTab === "resumes" && resumes.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={`flex items-center justify-between p-5 rounded-3xl shadow-md cursor-pointer border transition-all duration-300 ${selectedItem?.id === item.id ? 'bg-violet-100 dark:bg-violet-900/40 border-violet-300' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-xl'}`}
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

                {/* JOBS LIST */}
                {activeTab === "jobs" && jobs.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={`flex items-center justify-between p-5 rounded-3xl shadow-md cursor-pointer border transition-all duration-300 ${selectedItem?.id === item.id ? 'bg-violet-100 dark:bg-violet-900/40 border-violet-300' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-xl'}`}
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

                {/* COVER LETTERS LIST */}
                {activeTab === "letters" && coverLetters.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={`flex items-center justify-between p-5 rounded-3xl shadow-md cursor-pointer border transition-all duration-300 ${selectedItem?.id === item.id ? 'bg-violet-100 dark:bg-violet-900/40 border-violet-300' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-xl'}`}
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

                {/* JD ANALYSIS LIST */}
                {activeTab === "jd" && jdAnalyses.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={`flex items-center justify-between p-5 rounded-3xl shadow-md cursor-pointer border transition-all duration-300 ${selectedItem?.id === item.id ? 'bg-violet-100 dark:bg-violet-900/40 border-violet-300' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-xl'}`}
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

                {/* ATS SCORES LIST */}
                {activeTab === "ats" && atsScores.map(item => (
                  <motion.div key={item.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={`flex items-center justify-between p-5 rounded-3xl shadow-md cursor-pointer border transition-all duration-300 ${selectedItem?.id === item.id ? 'bg-violet-100 dark:bg-violet-900/40 border-violet-300' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-xl'}`}
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

                {/* ALL HISTORY LIST */}
                {activeTab === "all" && [
                  ...resumes.map(item => ({ ...item, category: "resumes", icon: "📄", type: "Resume" })),
                  ...jobs.map(item => ({ ...item, category: "jobs", icon: "🏢", type: "Job Match" })),
                  ...coverLetters.map(item => ({ ...item, category: "letters", icon: "✉️", type: "Cover Letter" })),
                  ...jdAnalyses.map(item => ({ ...item, category: "jd", icon: "🔎", type: "JD Analysis" })),
                  ...atsScores.map(item => ({ ...item, category: "ats", icon: "📊", type: "ATS Score" }))
                ].sort((a, b) => new Date(b.date || "2023-01-01") - new Date(a.date || "2023-01-01")).map(item => (
                  <motion.div key={`${item.category}-${item.id}`} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
                    className={`flex items-center justify-between p-5 rounded-3xl shadow-md cursor-pointer border transition-all duration-300 ${selectedItem?.id === item.id && selectedItem?.category === item.category ? 'bg-violet-100 dark:bg-violet-900/40 border-violet-300' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-xl'}`}
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

            {/* EMPTY STATE */}
            {((activeTab === "resumes" && resumes.length === 0) || 
              (activeTab === "jobs" && jobs.length === 0) || 
              (activeTab === "letters" && coverLetters.length === 0) ||
              (activeTab === "jd" && jdAnalyses.length === 0) ||
              (activeTab === "ats" && atsScores.length === 0) ||
              (activeTab === "all" && (resumes.length + jobs.length + coverLetters.length + jdAnalyses.length + atsScores.length) === 0)) && (
                <div className="text-center py-16 bg-white/50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                   <p className="text-gray-400 font-medium">No {activeTab === "letters" ? "Cover Letters" : activeTab === "jd" ? "JD Analysis" : activeTab === "ats" ? "ATS Scores" : activeTab === "all" ? "documents" : activeTab} available yet.</p>
                </div>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-violet-100 dark:border-gray-700 h-fit sticky top-10">
            <div className="flex flex-col gap-5 mb-6">
              <div>
                <h3 className="text-xl font-bold dark:text-white">Details View</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Inspect selected documents, analysis results, and download files.</p>
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
                  className="w-full py-4 bg-violet-600 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 hover:bg-violet-700 transition-all active:scale-95"
                >
                  Download Document
                </button>
              </motion.div>
            ) : (
              <div className="text-center py-10">
                <div className="text-4xl mb-3 opacity-20">📂</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Select an item from your list to preview details and access the download options.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
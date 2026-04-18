import { useState } from "react";
import Login from"./pages/Login";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import ResumeBuilder from "./pages/ResumeBuilder";
<<<<<<< HEAD
import Dashboard from "./pages/Dashboard";
=======
import Dashboard from "./pages/Dashboard"; 
import JDAnalysis from "./pages/JDAnalysis";
>>>>>>> fa4369c (Wire JD Analysis and Improve Resume flows into app)



function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  // --- GLOBAL DATA STATE ---
  // Shared across the app so Dashboard and Builders can talk to each other
  const [resumes, setResumes] = useState([
    { id: 1, name: "Fullstack_Developer_v1.pdf", date: "2 days ago", content: "Resume Content for Fullstack Developer...", type: "Resume" },
    { id: 2, name: "Python_Backend_v2.pdf", date: "5 days ago", content: "Resume Content for Python Backend...", type: "Resume" }
  ]);

  const [jobs, setJobs] = useState([
    { id: 101, company: "Google", role: "Frontend Intern", location: "Hyderabad", details: "Requires React and Tailwind CSS knowledge." },
    { id: 102, company: "Microsoft", role: "Software Engineer", location: "Bangalore", details: "Focus on Azure and C# development." }
  ]);

  const [coverLetters, setCoverLetters] = useState([
    { id: 201, title: "Cover Letter - Google", content: "Dear Hiring Manager, I am excited to apply for the position at Google...", date: "Yesterday" }
  ]);

  const [jdAnalyses, setJdAnalyses] = useState([]);

  // Global helper to trigger a browser download
  const handleDownload = (filename, content) => {
    const element = document.createElement("a");
    const file = new Blob([content || "CareerForge Pro Document Content"], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename ? `${filename.split('.')[0]}.txt` : "document.txt";
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  const toggleDark = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
      <div className={isDark ? "dark" : ""}>
        {currentPage === "home" && (
          <Home 
            setCurrentPage={setCurrentPage} 
            setShowAtsModal={setShowAtsModal} 
          />
        )}
        
        {currentPage === "builder" && (
          <Builder 
            setCurrentPage={setCurrentPage} 
            setCoverLetters={setCoverLetters} 
          />
        )}
        
        {currentPage === "resume" && (
          <ResumeBuilder 
            setCurrentPage={setCurrentPage} 
            setResumes={setResumes} 
          />
        )}

        {currentPage === "jd-analysis" && (
          <JDAnalysis
            setCurrentPage={setCurrentPage}
            setJdAnalyses={setJdAnalyses}
          />
        )}

        {currentPage === "dashboard" && (
          <Dashboard 
            setCurrentPage={setCurrentPage} 
            onDownload={handleDownload}
            resumes={resumes}
            setResumes={setResumes}
            jobs={jobs}
            setJobs={setJobs}
            coverLetters={coverLetters}
            setCoverLetters={setCoverLetters}
            jdAnalyses={jdAnalyses}
            setJdAnalyses={setJdAnalyses}
          />
        )}

              {currentPage === "login" && (
        <Login setCurrentPage={setCurrentPage} />
      )}
    


        {/* ATS Score Modal Overlay */}
        {showAtsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-violet-500 transform transition-all animate-in fade-in zoom-in duration-300">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">ATS Analysis Report</h2>
              <div className="text-5xl font-black text-violet-600 mb-4">85%</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your resume is highly compatible with most job descriptions!
              </p>
              <button 
                onClick={() => setShowAtsModal(false)}
                className="w-full bg-violet-600 text-white py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/30"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    
  );
}

export default App;
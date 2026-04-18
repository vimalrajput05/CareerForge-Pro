import { useState } from "react";
import Login from"./pages/Login";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import ResumeBuilder from "./pages/ResumeBuilder";
import Dashboard from "./pages/Dashboard"; 
import JDAnalysis from "./pages/JDAnalysis";
import ATSScore from "./pages/ATSScore";



function App() {
  const [currentPage, setCurrentPage] = useState("home");
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

  const [atsScores, setAtsScores] = useState([]);

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

        {currentPage === "ats-score" && (
          <ATSScore
            setCurrentPage={setCurrentPage}
            setAtsScores={setAtsScores}
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
            atsScores={atsScores}
            setAtsScores={setAtsScores}
          />
        )}

        {currentPage === "login" && (
          <Login setCurrentPage={setCurrentPage} />
        )}
      </div>
    
  );
}

export default App;
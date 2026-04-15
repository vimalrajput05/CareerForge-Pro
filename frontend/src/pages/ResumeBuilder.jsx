import { useState } from "react";
import Navbar from "../components/Navbar";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";

function ResumeBuilder({ setCurrentPage }) {
  const [resumeData, setResumeData] = useState({
    template: "template1",
    name: "", role: "", email: "", phone: "",
    address: "", skills: "", experience: "",
    projects: "", certifications: "", profilePic: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/80 to-pink-50/80 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <Navbar onBack={() => setCurrentPage("builder")} showBack />

      <div className="px-4 sm:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Create Resume
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />

          {/* Sticky Preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Live Preview</p>
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
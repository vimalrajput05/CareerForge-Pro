import { useState } from "react";
import Navbar from "../components/Navbar";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";

function ResumeBuilder({ setCurrentPage }) {
  const [resumeData, setResumeData] = useState({
    template: "template1",
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    skills: "",
    experience: "",
    projects: "",
    certifications: "",
    profilePic: "",
  });
  const handleDownloadPDF = () => {
  const element = document.getElementById("resume-preview");

  if (!element) {
    alert("Preview not found");
    return;
  }

  const printWindow = window.open("", "_blank", "width=900,height=1200");

  if (!printWindow) {
    alert("Popup blocked. Please allow popups.");
    return;
  }

  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((node) => node.outerHTML)
    .join("");

  printWindow.document.write(`
    <html>
      <head>
        <title>Resume PDF</title>
        ${styles}
        <style>
          body {
            margin: 0;
            padding: 24px;
            background: white !important;
          }

          #resume-preview {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            background: white !important;
            box-shadow: none !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          @page {
            size: A4;
            margin: 12mm;
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, 700);
};
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/80 to-pink-50/80 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <Navbar onBack={() => setCurrentPage("builder")} showBack />

      <div className="px-4 sm:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Create Resume
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeForm
            resumeData={resumeData}
            setResumeData={setResumeData}
            handleDownloadPDF={handleDownloadPDF}
          />

          <div className="lg:sticky lg:top-20 lg:self-start bg-white p-2 rounded-2xl">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
              Live Preview
            </p>
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
import Navbar from "../components/Navbar";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { useResume } from "../context/ResumeContext";

function ResumeBuilder({ setCurrentPage, mode = "create", isPro }) {
  const { resumeData, setResumeData } = useResume();

  const handleDownloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      alert("Preview not found");
      return;
    }

    // Get all computed styles from the page
    const styleSheets = Array.from(document.styleSheets);
    let cssText = "";
    styleSheets.forEach((sheet) => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach((rule) => {
          cssText += rule.cssText + "\n";
        });
      } catch (e) {
        // Cross-origin stylesheets — skip
      }
    });

    const html = `
      <html>
        <head>
          <title>Resume</title>
          <meta charset="UTF-8" />
          <style>
            ${cssText}
            body { margin: 0; padding: 24px; background: white !important; font-family: sans-serif; }
            #resume-preview { width: 100%; max-width: 800px; margin: 0 auto; background: white !important; box-shadow: none !important; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            @page { size: A4; margin: 12mm; }
            @media print {
              body { margin: 0; }
              #resume-preview { page-break-inside: avoid; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>${element.outerHTML}</body>
      </html>`;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pdf/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html })
      });

      if (!response.ok) throw new Error("Backend PDF failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resumeData.name || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.warn("Backend not available, using print fallback:", err);
      const printWindow = window.open("", "_blank", "width=900,height=1200");
      if (!printWindow) {
        alert("Popup blocked. Please allow popups.");
        return;
      }
      const el = document.getElementById("resume-preview");
      printWindow.document.write(`
        <html>
          <head>
            <title>Resume PDF</title>
            <style>
              ${cssText}
              body { margin: 0; padding: 24px; background: white !important; }
              #resume-preview { width: 100%; max-width: 800px; margin: 0 auto; background: white !important; }
              * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              @page { size: A4; margin: 12mm; }
              @media print {
                body { margin: 0; }
                #resume-preview { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>${el.outerHTML}</body>
        </html>`);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 1000);
    }
  };

  const handleDownloadWord = () => {
    if (!isPro) {
      alert("Word download is a Pro feature. Upgrade to access this feature.");
      setCurrentPage("pricing");
      return;
    }

    const content = `
${resumeData.name || "Your Name"}
${resumeData.role || "Your Role"}

Contact:
${resumeData.email || "your@email.com"}
${resumeData.phone || "+91 XXXXX XXXXX"}
${resumeData.address || "Your Address"}

Skills:
${resumeData.skills || "Add your skills"}

Experience:
${resumeData.experience || "Add your experience"}

Projects:
${resumeData.projects || "Add your projects"}

Certifications:
${resumeData.certifications || "Add your certifications"}
    `;

    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.name || "resume"}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/80 to-pink-50/80 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <Navbar onBack={() => setCurrentPage("builder")} showBack />

      <div className="px-4 sm:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {mode === "improve" ? "Improve Resume" : "Create Resume"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-3xl">
          {mode === "improve"
            ? "Paste your current resume content or update the fields below, and CareerForge will help rewrite your experience with clearer language, better structure, and stronger keyword focus."
            : "Build your resume from scratch with live preview and instant formatting so you can export a polished PDF in minutes."}
        </p>

        {mode === "improve" && (
          <div className="mb-6 rounded-3xl border border-violet-200/70 dark:border-violet-700/50 bg-violet-50/80 dark:bg-violet-900/20 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What this page does</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This page is designed to improve your existing resume copy. Enter your current details and career highlights, then use the live preview to see the improved version before downloading.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeForm
            resumeData={resumeData}
            setResumeData={setResumeData}
            handleDownloadPDF={handleDownloadPDF}
            handleDownloadWord={handleDownloadWord}
            mode={mode}
            isPro={isPro}
          />

          <div className="lg:sticky lg:top-20 lg:self-start bg-white p-4 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
              {mode === "improve" ? "Improved Resume Preview" : "Live Preview"}
            </p>
            <div className="overflow-x-auto">
              <ResumePreview resumeData={resumeData} mode={mode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
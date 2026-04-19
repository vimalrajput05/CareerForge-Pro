function ResumeForm({ resumeData, setResumeData, handleDownloadPDF, mode = "create" }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const inputClass = "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:focus:ring-violet-400 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 shadow-sm text-sm";
  const textareaClass = `${inputClass} resize-vertical h-24`;

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Resume Details</h2>

      <div className="space-y-3">
        {mode === "improve" && (
          <div className="rounded-3xl border border-violet-200/70 dark:border-violet-700/50 bg-violet-50/80 dark:bg-violet-900/20 p-5 shadow-sm">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              This mode helps you polish your existing resume content. Update the fields with your current details, and the preview will show a more refined version with stronger structure and clarity.
            </p>
          </div>
        )}
        {/* Template Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Template</label>
          <select
            name="template"
            value={resumeData.template}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="template1">Template 1 — Classic Header</option>
            <option value="template2">Template 2 — Sidebar</option>
            <option value="template3">Template 3 — Minimal Card</option>
          </select>
        </div>

        {/* Profile Photo */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Profile Photo</label>
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
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Full Name *</label>
            <input type="text" name="name" placeholder="John Doe" value={resumeData.name} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Job Role</label>
            <input type="text" name="role" placeholder="Frontend Developer" value={resumeData.role} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Email</label>
            <input type="email" name="email" placeholder="john@email.com" value={resumeData.email} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Phone</label>
            <input type="tel" name="phone" placeholder="+91 98765 43210" value={resumeData.phone} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Location</label>
          <input type="text" name="address" placeholder="Mumbai, Maharashtra" value={resumeData.address} onChange={handleChange} className={inputClass} />
        </div>

        {/* Detailed sections */}
        {[
          { name: "skills", label: "Skills", placeholder: "React, Node.js, Python, SQL..." },
          { name: "experience", label: "Experience", placeholder: "Company Name — Role (Year)\nDescribe your responsibilities..." },
          { name: "projects", label: "Projects & Achievements", placeholder: "Project Name — Brief description\nTech used, impact..." },
          { name: "certifications", label: "Education & Certifications", placeholder: "B.Tech CSE — XYZ University (2022)\nAWS Certified..." },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">{label}</label>
            <textarea name={name} placeholder={placeholder} value={resumeData[name]} onChange={handleChange} className={textareaClass} />
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            handleDownloadPDF();
          }}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-md text-sm"
        >
          📥 {mode === "improve" ? "Download Improved Resume" : "Download Resume as PDF"}
        </button>
      </div>
    </div>
  );
}

export default ResumeForm;
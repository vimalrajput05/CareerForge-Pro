function ResumePreview({ resumeData, mode = "create" }) {
  const {
    template,
    name, role, email, phone, address,
    skills, experience, projects, certifications, profilePic,
  } = resumeData;

  const N = name || "Your Name";
  const R = role || "Your Role";
  const E = email || "your@email.com";
  const P = phone || "+91 XXXXX XXXXX";
  const A = address || "Your Address";
  const SK = skills || "Add your skills";
  const EX = experience || "Add your experience";
  const PR = projects || "Add your projects";
  const CE = certifications || "Add your certifications";

  const sectionTitle = "text-sm font-bold uppercase tracking-widest mb-2 pb-1 border-b-2";
  const sectionText = "text-sm text-gray-600 whitespace-pre-line leading-relaxed";

  // ── TEMPLATE 2: Sidebar ──
  if (template === "template2") {
    return (
      <div id="resume-preview" className="w-full max-w-full bg-white mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 min-h-full max-w-full">
          {/* Sidebar */}
          <div className="w-full lg:w-[200px] bg-gradient-to-b from-fuchsia-600 to-violet-700 text-white p-4 lg:p-6 flex flex-col gap-5">
            {profilePic && (
              <img src={profilePic} alt="profile" className="w-20 lg:w-24 h-20 lg:h-24 rounded-full object-cover mx-auto border-4 border-white/50 shadow-lg" />
            )}
            <div className="text-center">
              <h1 className="text-base lg:text-lg font-bold leading-tight">{N}</h1>
              <p className="text-xs text-fuchsia-200 mt-1">{R}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-200 mb-2">Contact</p>
              <p className="text-xs mb-1 break-all">{E}</p>
              <p className="text-xs mb-1">{P}</p>
              <p className="text-xs">{A}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-200 mb-2">Skills</p>
              <p className="text-xs whitespace-pre-line leading-relaxed">{SK}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-7 space-y-5">
            <div>
              <p className={`${sectionTitle} text-violet-700 border-violet-200`}>Experience</p>
              <p className={sectionText}>{EX}</p>
            </div>
            <div>
              <p className={`${sectionTitle} text-violet-700 border-violet-200`}>Projects</p>
              <p className={sectionText}>{PR}</p>
            </div>
            <div>
              <p className={`${sectionTitle} text-violet-700 border-violet-200`}>Education & Certifications</p>
              <p className={sectionText}>{CE}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TEMPLATE 3: Minimal Card ──
  if (template === "template3") {
    return (
      <div id="resume-preview" className="w-full max-w-full bg-white overflow-hidden">
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-slate-700 to-slate-500" />
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mb-6 pb-5 border-b border-slate-100">
            {profilePic && (
              <img src={profilePic} alt="profile" className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-2 border-slate-200 shadow" />
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{N}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{R}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                <span className="text-xs text-slate-400">{E}</span>
                <span className="text-xs text-slate-400">{P}</span>
                <span className="text-xs text-slate-400">{A}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-5">
            <div>
              <p className={`${sectionTitle} text-slate-700 border-slate-200`}>Skills</p>
              <p className={sectionText}>{SK}</p>
            </div>
            <div>
              <p className={`${sectionTitle} text-slate-700 border-slate-200`}>Experience</p>
              <p className={sectionText}>{EX}</p>
            </div>
            <div>
              <p className={`${sectionTitle} text-slate-700 border-slate-200`}>Projects</p>
              <p className={sectionText}>{PR}</p>
            </div>
            <div>
              <p className={`${sectionTitle} text-slate-700 border-slate-200`}>Education & Certifications</p>
              <p className={sectionText}>{CE}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TEMPLATE 1: Classic (Default) ──
  return (
    <div id="resume-preview" className="w-full max-w-full bg-white overflow-hidden">      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white p-4 lg:p-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
          {profilePic && (
            <img src={profilePic} alt="profile" className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-3 border-white/60 shadow-md flex-shrink-0" />
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{N}</h1>
            <p className="text-fuchsia-100 text-sm mt-0.5">{R}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <span className="text-xs text-white/80">{E}</span>
              <span className="text-xs text-white/80">{P}</span>
            </div>
            <p className="text-xs text-white/70 mt-1">{A}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 lg:p-7 space-y-5">
        <div>
          <p className={`${sectionTitle} text-violet-700 border-violet-200`}>Skills</p>
          <p className={sectionText}>{SK}</p>
        </div>
        <div>
          <p className={`${sectionTitle} text-violet-700 border-violet-200`}>Experience</p>
          <p className={sectionText}>{EX}</p>
        </div>
        <div>
          <p className={`${sectionTitle} text-violet-700 border-violet-200`}>Projects & Achievements</p>
          <p className={sectionText}>{PR}</p>
        </div>
        <div>
          <p className={`${sectionTitle} text-violet-700 border-violet-200`}>Education & Certifications</p>
          <p className={sectionText}>{CE}</p>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
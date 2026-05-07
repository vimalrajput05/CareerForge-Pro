function ResumePreview({ resumeData, mode = "create" }) {
  const {
    template,
    name,
    role,
    email,
    phone,
    address,
    skills,
    experience,
    projects,
    certifications,
    profilePic,
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

  const sectionTitle =
    "text-sm font-bold uppercase tracking-widest mb-2 pb-1 border-b-2";
  const sectionText =
    "text-sm text-gray-600 whitespace-pre-line leading-relaxed";

  // ── TEMPLATE 2: Sidebar ──
  if (template === "template2") {
    return (
      <div
        id="resume-preview"
        className="w-full max-w-full bg-white mx-auto overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row gap-6 min-h-full max-w-full">
          <div className="w-full lg:w-[200px] bg-gradient-to-b from-fuchsia-600 to-violet-700 text-white p-4 lg:p-6 flex flex-col gap-5">
            {profilePic && (
              <img
                src={profilePic}
                alt="profile"
                className="w-20 lg:w-24 h-20 lg:h-24 rounded-full object-cover mx-auto border-4 border-white/50 shadow-lg"
              />
            )}

            <div className="text-center">
              <h1 className="text-base lg:text-lg font-bold leading-tight">
                {N}
              </h1>
              <p className="text-xs text-fuchsia-200 mt-1">{R}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-200 mb-2">
                Contact
              </p>
              <p className="text-xs mb-1 break-all">{E}</p>
              <p className="text-xs mb-1">{P}</p>
              <p className="text-xs">{A}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-200 mb-2">
                Skills
              </p>
              <p className="text-xs whitespace-pre-line leading-relaxed">
                {SK}
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 lg:p-7 space-y-5">
            <div className="break-inside-avoid">
              <p
                className={`${sectionTitle} text-violet-700 border-violet-200`}
              >
                Experience
              </p>
              <p className={sectionText}>{EX}</p>
            </div>

            <div className="break-inside-avoid">
              <p
                className={`${sectionTitle} text-violet-700 border-violet-200`}
              >
                Projects
              </p>
              <p className={sectionText}>{PR}</p>
            </div>

            <div className="break-inside-avoid">
              <p
                className={`${sectionTitle} text-violet-700 border-violet-200`}
              >
                Education & Certifications
              </p>
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
      <div
        id="resume-preview"
        className="w-full max-w-full bg-white overflow-hidden"
      >
        <div className="h-2 bg-gradient-to-r from-slate-700 to-slate-500" />

        <div className="p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mb-6 pb-5 border-b border-slate-100">
            {profilePic && (
              <img
                src={profilePic}
                alt="profile"
                className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-2 border-slate-200 shadow"
              />
            )}

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                {N}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">{R}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                <span className="text-xs text-slate-400">{E}</span>
                <span className="text-xs text-slate-400">{P}</span>
                <span className="text-xs text-slate-400">{A}</span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p
                className={`${sectionTitle} text-slate-700 border-slate-200`}
              >
                Skills
              </p>
              <p className={sectionText}>{SK}</p>
            </div>

            <div className="break-inside-avoid">
              <p
                className={`${sectionTitle} text-slate-700 border-slate-200`}
              >
                Experience
              </p>
              <p className={sectionText}>{EX}</p>
            </div>

            <div className="break-inside-avoid">
              <p
                className={`${sectionTitle} text-slate-700 border-slate-200`}
              >
                Projects
              </p>
              <p className={sectionText}>{PR}</p>
            </div>

            <div className="break-inside-avoid">
              <p
                className={`${sectionTitle} text-slate-700 border-slate-200`}
              >
                Education & Certifications
              </p>
              <p className={sectionText}>{CE}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TEMPLATE 4: Premium Executive ──
  if (template === "template4") {
    return (
      <div
        id="resume-preview"
        className="w-full max-w-full bg-white mx-auto overflow-hidden text-slate-900"
      >
        <div className="relative bg-slate-950 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-fuchsia-500/20 rounded-full blur-3xl" />

          <div className="relative p-5 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {profilePic && (
                <img
                  src={profilePic}
                  alt="profile"
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
                />
              )}

              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-violet-300 mb-2">
                  Professional Resume
                </p>

                <h1 className="text-2xl lg:text-4xl font-black tracking-tight">
                  {N}
                </h1>

                <p className="mt-2 text-sm lg:text-base text-violet-100 font-medium">
                  {R}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/75">
                  <span>{E}</span>
                  <span>{P}</span>
                  <span>{A}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.4fr] gap-0">
          <div className="bg-slate-50 p-5 lg:p-7 border-r border-slate-100">
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-700 mb-3">
                Core Skills
              </p>

              <div className="flex flex-wrap gap-2">
                {SK.split(/,|\n/)
                  .filter(Boolean)
                  .map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white border border-violet-100 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-700 mb-3">
                Education & Certifications
              </p>

              <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                {CE}
              </p>
            </div>
          </div>

              <div className="p-5 lg:p-8 space-y-7">
            <div className="break-inside-avoid">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-violet-600 to-fuchsia-500" />
                <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-800">
                  Experience
                </p>
              </div>

              <p className="text-sm leading-7 text-slate-600 whitespace-pre-line">
                {EX}
              </p>
            </div>

            <div className="break-inside-avoid">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-violet-600 to-fuchsia-500" />
                <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-800">
                  Projects & Achievements
                </p>
              </div>

              <p className="text-sm leading-7 text-slate-600 whitespace-pre-line">
                {PR}
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-violet-50 to-fuchsia-50 p-5 border border-violet-100">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-700 mb-2">
                Career Summary
              </p>

              <p className="text-sm leading-7 text-slate-600">
                A focused and detail-oriented professional with skills in {R}.
                Experienced in building impactful projects and continuously
                improving technical and professional abilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TEMPLATE 1: Classic Default ──
  return (
    <div
      id="resume-preview"
      className="w-full max-w-full bg-white overflow-hidden"
    >
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white p-4 lg:p-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
          {profilePic && (
            <img
              src={profilePic}
              alt="profile"
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-3 border-white/60 shadow-md flex-shrink-0"
            />
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

      <div className="p-4 lg:p-7 space-y-5">
        <div>
          <p className={`${sectionTitle} text-violet-700 border-violet-200`}>
            Skills
          </p>
          <p className={sectionText}>{SK}</p>
        </div>

        <div>
          <p className={`${sectionTitle} text-violet-700 border-violet-200`}>
            Experience
          </p>
          <p className={sectionText}>{EX}</p>
        </div>

        <div>
          <p className={`${sectionTitle} text-violet-700 border-violet-200`}>
            Projects & Achievements
          </p>
          <p className={sectionText}>{PR}</p>
        </div>

        <div>
          <p className={`${sectionTitle} text-violet-700 border-violet-200`}>
            Education & Certifications
          </p>
          <p className={sectionText}>{CE}</p>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
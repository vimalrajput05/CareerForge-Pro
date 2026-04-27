import { createContext, useContext, useState, useCallback } from "react";

const defaultResumeData = {
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
};

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState({ ...defaultResumeData });

  const updateResumeField = useCallback((field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetResume = useCallback(() => {
    setResumeData({ ...defaultResumeData });
  }, []);

  const value = {
    resumeData,
    setResumeData,
    updateResumeField,
    resetResume,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}


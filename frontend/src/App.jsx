import { useState, createContext, useContext } from "react";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import ResumeBuilder from "./pages/ResumeBuilder";

export const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

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
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {currentPage === "home" && (
        <Home setShowWorkspace={() => setCurrentPage("builder")} />
      )}
      {currentPage === "builder" && (
        <Builder setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "resume" && (
        <ResumeBuilder setCurrentPage={setCurrentPage} />
      )}
    </DarkModeContext.Provider>
  );
}

export default App;
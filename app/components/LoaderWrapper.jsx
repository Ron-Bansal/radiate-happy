"use client";
import { useState, useEffect } from "react";
import Loader from "./Loader";

export default function LoaderWrapper({ children, forceShow = false }) {
  const [loading, setLoading] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  // Use useEffect to safely check session storage on client-side
  useEffect(() => {
    // Mark that we've completed initial render
    setInitialRender(false);

    // If forceShow is true, always show the loader (for testing)
    if (forceShow) {
      return;
    }

    try {
      // Check if the loader has been shown in this session
      const loaderShown = sessionStorage.getItem("loaderShown");

      if (loaderShown === "true") {
        // Returning visitor, skip loader
        setLoading(false);
      }
    } catch (error) {
      // In case of private browsing mode or other sessionStorage issues
      console.error("Error accessing sessionStorage:", error);
      setLoading(false);
    }
  }, [forceShow]);

  const handleLoadingComplete = () => {
    if (!forceShow) {
      try {
        // Mark that we've shown the loader in this session
        sessionStorage.setItem("loaderShown", "true");
      } catch (error) {
        console.error("Error setting sessionStorage:", error);
      }
    }
    
    setLoading(false);
  };

  // During SSR or first render, return a minimal structure to avoid flashing
  if (initialRender) {
    return <div className="bg-[#2c292a] w-full h-screen"></div>;
  }

  return (
    <>
      {loading && <Loader onComplete={handleLoadingComplete} />}
      <div
        className={`transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        {children}
      </div>
    </>
  );
}
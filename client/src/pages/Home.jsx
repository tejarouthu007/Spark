import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#131515] text-[#fffafa]">
      <Header />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 text-center gap-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold mb-4">Welcome to <span className="text-[#38b137]">SPARK</span> Energy Management System</h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Optimize your organization's energy consumption with real-time monitoring and AI-powered insights.
          </p>
        </div>
        <button className="flex items-center font-semibold gap-2 bg-[#38b137] text-bold rounded-full px-5 py-1.5 text-[#fffafa] hover:bg-[#fffafa] hover:text-[#38b137] transition-all duration-300" onClick={()=>{navigate('/login')}}>Get Started</button>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-[#1a1c1e] text-gray-400">
        &copy; {new Date().getFullYear()} MericWave Computanics. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

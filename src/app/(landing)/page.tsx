'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, FileText, Search, Zap, ArrowRight, Folder } from 'lucide-react';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { AuroraText } from "@/components/magicui/aurora-text";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Converse Seamlessly. Unlock Insights Instantly.",
      description: "Chat with your documents, get rapid answers, extract critical insights, and simplify complex information effortlessly."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Create Sharp, Actionable Summaries in Seconds",
      description: "Cut through long documents to capture essential details—no more overwhelm, just precise, usable insights."
    },
    {
      icon: <Folder className="w-6 h-6" />,
      title: "Keep Your Document Library Organized and Accessible",
      description: "Manage, categorize, and retrieve documents effortlessly—say goodbye to clutter and boost your productivity."
    }
  ];

  return (
    <BackgroundBeamsWithCollision>
      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Find Your
              <AuroraText colors={["#3B82F6", "#1E3A8A", "#60A5FA", "#1D4ED8"]} className="ml-4 mt-2.5 text-transparent bg-clip-text" speed={1.5}>Documents</AuroraText>
              <br />
              <span className="text-4xl md:text-6xl">Instantly</span>
            </h1>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="font-semibold text-blue-700">Your AI-powered document assistant, simplified.</span>
              <br />
              Chat, summarize, and manage your entire document library without the hassle.
            </p>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-blue-600 rounded-xl font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg border border-blue-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div
          className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-100 cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
                  <div className="text-blue-600 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-200">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">{feature.description}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 flex items-center justify-center">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
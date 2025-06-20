import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const Greeting = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-purple-900 via-ai-blue-900 to-ai-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-ai-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-32 w-96 h-96 bg-ai-blue-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-80 h-80 bg-ai-pink-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className={
          'absolute inset-0 bg-[url(\'data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>\')] opacity-20'
        }
      ></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto animate-slide-up">
          {/* Logo/Brand */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-ai-purple-400 to-ai-blue-400 rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-ai-purple-300 via-ai-blue-300 to-ai-pink-300 bg-clip-text text-transparent">
              Hi, how are you doing today?
            </span>
          </h1>

          <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mb-8">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-ai-purple-400 to-ai-blue-400 bg-clip-text text-transparent">
              Multipurpose AI Suite
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Unlock the power of AI with our comprehensive suite of tools
            designed to boost your productivity and creativity.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className={`
                relative group px-12 py-6 text-xl font-semibold
                bg-gradient-to-r from-ai-purple-500 to-ai-blue-500 
                hover:from-ai-purple-400 hover:to-ai-blue-400
                text-white border-0 rounded-2xl
                transform transition-all duration-300 ease-out
                hover:scale-110 hover:shadow-2xl
                focus:outline-none focus:ring-4 focus:ring-ai-purple-500/50
                ${isHovered ? "animate-pulse-glow" : ""}
              `}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => navigate("/auth")}
            >
              <span className="relative z-10 flex items-center gap-3">
                Begin Your Journey
                <ArrowRight
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isHovered ? "translate-x-2" : ""
                  }`}
                />
              </span>

              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-ai-purple-600 to-ai-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 scale-0 group-active:scale-100 transition-transform duration-150"></div>
            </Button>
          </div>

          {/* Features preview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: "✉️",
                title: "Email Generator",
                desc: "AI-powered cold emails",
              },
              {
                icon: "📄",
                title: "Resume Optimizer",
                desc: "ATS-friendly resumes",
              },
              {
                icon: "🔧",
                title: "Code Debugger",
                desc: "Smart bug detection",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;

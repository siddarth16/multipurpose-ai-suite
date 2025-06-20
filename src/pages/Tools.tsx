import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, FileText, Code, ArrowRight, Sparkles } from "lucide-react";

const Tools = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: "email-generator",
      title: "Cold Email Generator & Sender",
      description:
        "Create compelling cold emails for business promotion or job hunting with AI-powered personalization",
      icon: Mail,
      gradient: "from-ai-purple-500 to-ai-blue-500",
      path: "/tools/email-generator",
    },
    {
      id: "resume",
      title: "Resume ATS Checker & Optimizer",
      description:
        "Analyze and optimize your resume for ATS systems and specific job roles",
      icon: FileText,
      gradient: "from-ai-blue-500 to-ai-pink-500",
      path: "/tools/resume",
    },
    {
      id: "debugger",
      title: "Code Debugger",
      description:
        "AI-powered bug detection and fix suggestions for your code with detailed explanations",
      icon: Code,
      gradient: "from-ai-pink-500 to-ai-purple-500",
      path: "/tools/debugger",
    },
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleNext = () => {
    if (selectedTool) {
      const tool = tools.find((t) => t.id === selectedTool);
      if (tool) {
        navigate(tool.path);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-purple-900 via-ai-blue-900 to-ai-pink-900">
      <Navigation />

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-ai-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-ai-blue-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-ai-purple-400 to-ai-blue-400 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-ai-purple-300 to-ai-blue-300 bg-clip-text text-transparent">
                AI Tool
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Select the perfect AI-powered tool to boost your productivity and
              achieve your goals
            </p>
          </div>

          {/* Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              const isSelected = selectedTool === tool.id;

              return (
                <Card
                  key={tool.id}
                  className={`
                    relative overflow-hidden cursor-pointer transition-all duration-500 transform
                    ${isSelected ? "scale-105 ring-4 ring-white/30" : "hover:scale-105"}
                    glass border-white/20 backdrop-blur-xl
                    animate-slide-up
                  `}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => handleToolSelect(tool.id)}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-10 transition-opacity duration-500 ${
                      isSelected ? "opacity-20" : ""
                    }`}
                  ></div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-ai-purple-400 to-ai-blue-400 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}

                  <CardContent className="relative p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {tool.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-white"
                      >
                        Select Tool
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Next Button */}
          <div className="text-center">
            <Button
              size="lg"
              disabled={!selectedTool}
              className={`
                px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-300
                ${
                  selectedTool
                    ? "bg-gradient-to-r from-ai-purple-500 to-ai-blue-500 hover:from-ai-purple-400 hover:to-ai-blue-400 text-white hover:scale-105 hover:shadow-2xl"
                    : "bg-white/10 text-white/50 cursor-not-allowed"
                }
              `}
              onClick={handleNext}
            >
              {selectedTool ? "Continue with Selected Tool" : "Select a Tool"}
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>

          {/* Helper text */}
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">
              You can always switch between tools later from the navigation menu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;

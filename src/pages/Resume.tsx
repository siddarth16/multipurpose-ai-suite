import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Search,
  Zap,
  Target,
  Upload,
  Download,
  Sparkles,
} from "lucide-react";

const Resume = () => {
  const [checkerResume, setCheckerResume] = useState("");
  const [checkerRole, setCheckerRole] = useState("");
  const [checkerResult, setCheckerResult] = useState("");
  const [checkerLoading, setCheckerLoading] = useState(false);

  const [optResume, setOptResume] = useState("");
  const [optRole, setOptRole] = useState("");
  const [optHighlights, setOptHighlights] = useState("");
  const [optStyle, setOptStyle] = useState("objective");
  const [optResult, setOptResult] = useState("");
  const [optLoading, setOptLoading] = useState(false);

  const handleCheckerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCheckerResume(reader.result as string);
    reader.readAsText(file);
  };

  const handleOptFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setOptResume(reader.result as string);
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    setCheckerLoading(true);
    setCheckerResult("");
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: [
              {
                role: "system",
                content:
                  "You score resumes for ATS. Provide a score out of 100 with a short explanation.",
              },
              {
                role: "user",
                content: `Resume:\n${checkerResume}\nTarget Role: ${checkerRole}`,
              },
            ],
            temperature: 0.3,
          }),
        },
      );
      const data = await response.json();
      setCheckerResult(
        data.choices?.[0]?.message?.content?.trim() || "No result",
      );
    } catch (_e) {
      setCheckerResult("Failed to analyze resume");
    } finally {
      setCheckerLoading(false);
    }
  };

  const handleOptimize = async () => {
    setOptLoading(true);
    setOptResult("");
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: [
              {
                role: "system",
                content:
                  "You optimize resumes for a target job and ATS. Respond with the improved resume text only.",
              },
              {
                role: "user",
                content: `Resume:\n${optResume}\nTarget Role: ${optRole}\nHighlights: ${optHighlights}\nStyle: ${optStyle}`,
              },
            ],
            temperature: 0.3,
          }),
        },
      );
      const data = await response.json();
      setOptResult(data.choices?.[0]?.message?.content?.trim() || "No result");
    } catch (_e) {
      setOptResult("Failed to optimize resume");
    } finally {
      setOptLoading(false);
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
              <div className="w-16 h-16 bg-gradient-to-br from-ai-blue-400 to-ai-pink-400 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-ai-blue-300 to-ai-pink-300 bg-clip-text text-transparent">
                Resume Tools
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Analyze and optimize your resume with AI-powered insights for
              better ATS compatibility and job matching
            </p>
          </div>

          {/* Tools Tabs */}
          <div className="mb-12">
            <Tabs defaultValue="checker" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur-md border border-white/20">
                <TabsTrigger
                  value="checker"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-ai-blue-500 data-[state=active]:to-ai-pink-500 data-[state=active]:text-white text-white/70"
                >
                  <Search className="w-4 h-4 mr-2" />
                  ATS Score Checker
                </TabsTrigger>
                <TabsTrigger
                  value="optimizer"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-ai-pink-500 data-[state=active]:to-ai-purple-500 data-[state=active]:text-white text-white/70"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Resume Optimizer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="checker" className="animate-slide-up">
                <Card className="glass border-white/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Search className="w-6 h-6 mr-3" />
                      ATS Score Checker
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Upload Section */}
                      <div className="space-y-6">
                        <label
                          htmlFor="checker-upload"
                          className="block text-center p-8 border-2 border-dashed border-white/30 rounded-xl hover:border-ai-blue-400/50 transition-colors cursor-pointer"
                        >
                          <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                          <h3 className="text-white font-semibold mb-2">
                            Upload Your Resume
                          </h3>
                          <p className="text-white/70 text-sm">
                            Supports PDF and DOC formats
                          </p>
                          <input
                            id="checker-upload"
                            type="file"
                            accept=".txt,.md,.pdf,.doc,.docx"
                            onChange={handleCheckerFile}
                            className="hidden"
                          />
                        </label>

                        <div className="space-y-4">
                          <Label className="text-white/90">Target Role</Label>
                          <Input
                            value={checkerRole}
                            onChange={(e) => setCheckerRole(e.target.value)}
                            placeholder="e.g., Software Engineer, Marketing Manager"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-ai-blue-400"
                          />
                        </div>
                        {checkerResume && (
                          <Textarea
                            readOnly
                            rows={6}
                            value={checkerResume}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        )}
                      </div>

                      {/* Features Preview */}
                      <div className="space-y-6">
                        <h3 className="text-white font-semibold text-lg mb-4">
                          What we analyze:
                        </h3>
                        <div className="space-y-4">
                          {[
                            {
                              icon: Target,
                              title: "Keyword Matching",
                              desc: "Match against job requirements",
                            },
                            {
                              icon: FileText,
                              title: "Format Analysis",
                              desc: "ATS-friendly formatting check",
                            },
                            {
                              icon: Zap,
                              title: "Content Quality",
                              desc: "Skills and experience assessment",
                            },
                          ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                              <div
                                key={index}
                                className="flex items-center space-x-3"
                              >
                                <div className="w-10 h-10 bg-gradient-to-r from-ai-blue-500 to-ai-pink-500 rounded-lg flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-white font-medium">
                                    {feature.title}
                                  </h4>
                                  <p className="text-white/60 text-sm">
                                    {feature.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <Button
                        onClick={handleAnalyze}
                        disabled={checkerLoading}
                        className="bg-gradient-to-r from-ai-blue-500 to-ai-pink-500 hover:from-ai-blue-400 hover:to-ai-pink-400 text-white px-8 py-3 rounded-xl font-semibold"
                      >
                        {checkerLoading ? "Analyzing..." : "Analyze Resume"}
                      </Button>
                      {checkerResult && (
                        <Textarea
                          readOnly
                          rows={6}
                          value={checkerResult}
                          className="bg-white/10 border border-white/20 text-white"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="optimizer" className="animate-slide-up">
                <Card className="glass border-white/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Zap className="w-6 h-6 mr-3" />
                      Resume Optimizer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Input Section */}
                      <div className="space-y-6">
                        <label
                          htmlFor="optimizer-upload"
                          className="block text-center p-8 border-2 border-dashed border-white/30 rounded-xl hover:border-ai-pink-400/50 transition-colors cursor-pointer"
                        >
                          <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                          <h3 className="text-white font-semibold mb-2">
                            Upload Current Resume
                          </h3>
                          <p className="text-white/70 text-sm">
                            We'll optimize it for your target role
                          </p>
                          <input
                            id="optimizer-upload"
                            type="file"
                            accept=".txt,.md,.pdf,.doc,.docx"
                            onChange={handleOptFile}
                            className="hidden"
                          />
                        </label>

                        <div className="space-y-4">
                          <Label className="text-white/90">Target Role</Label>
                          <Input
                            value={optRole}
                            onChange={(e) => setOptRole(e.target.value)}
                            placeholder="e.g., Senior Software Engineer"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-ai-pink-400"
                          />
                        </div>

                        <div className="space-y-4">
                          <Label className="text-white/90">
                            Specific Highlights
                          </Label>
                          <Textarea
                            value={optHighlights}
                            onChange={(e) => setOptHighlights(e.target.value)}
                            placeholder="Key achievements or skills to emphasize..."
                            rows={4}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:border-ai-pink-400 focus:outline-none resize-none"
                          />
                        </div>
                        {optResume && (
                          <Textarea
                            readOnly
                            rows={6}
                            value={optResume}
                            className="bg-white/5 border-white/20 text-white"
                          />
                        )}
                      </div>

                      {/* Optimization Options */}
                      <div className="space-y-6">
                        <h3 className="text-white font-semibold text-lg mb-4">
                          Optimization Options:
                        </h3>
                        <div className="space-y-4">
                          {[
                            {
                              value: "objective",
                              label: "Objective-Focused",
                              desc: "Emphasize goals and aspirations",
                            },
                            {
                              value: "technical",
                              label: "Technical",
                              desc: "Highlight technical skills and expertise",
                            },
                            {
                              value: "quantitative",
                              label: "Quantitative",
                              desc: "Focus on numbers and measurable results",
                            },
                          ].map((tone, index) => (
                            <div
                              key={index}
                              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-ai-pink-400/30 transition-colors cursor-pointer"
                              onClick={() => setOptStyle(tone.value)}
                            >
                              <div className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name="tone"
                                  value={tone.value}
                                  checked={optStyle === tone.value}
                                  onChange={() => setOptStyle(tone.value)}
                                  className="text-ai-pink-500"
                                />
                                <div>
                                  <h4 className="text-white font-medium">
                                    {tone.label}
                                  </h4>
                                  <p className="text-white/60 text-sm">
                                    {tone.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <Button
                        onClick={handleOptimize}
                        disabled={optLoading}
                        className="bg-gradient-to-r from-ai-pink-500 to-ai-purple-500 hover:from-ai-pink-400 hover:to-ai-purple-400 text-white px-8 py-3 rounded-xl font-semibold"
                      >
                        {optLoading
                          ? "Generating..."
                          : "Generate Optimized Resume"}
                      </Button>
                      {optResult && (
                        <Textarea
                          readOnly
                          rows={8}
                          value={optResult}
                          className="bg-white/10 border border-white/20 text-white"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center">
            <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-ai-blue-400 to-ai-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Advanced Features Coming Soon!
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  We're developing powerful AI algorithms to provide detailed
                  resume analysis and optimization. Get ready for professional
                  insights that will make your resume stand out.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <Badge className="bg-ai-blue-500/20 text-ai-blue-300 border-ai-blue-500/30 px-4 py-2">
                    ATS Compatibility
                  </Badge>
                  <Badge className="bg-ai-pink-500/20 text-ai-pink-300 border-ai-pink-500/30 px-4 py-2">
                    Keyword Optimization
                  </Badge>
                  <Badge className="bg-ai-purple-500/20 text-ai-purple-300 border-ai-purple-500/30 px-4 py-2">
                    Industry Insights
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                    Real-time Scoring
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

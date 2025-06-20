import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Code,
  Upload,
  Search,
  Download,
  FileText,
  Bug,
  Sparkles,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const Debugger = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCode(reader.result as string);
    reader.readAsText(file);
  };

  const handleRun = async () => {
    if (!code) return;
    setLoading(true);
    setResult("");
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
            model: "llama3-70b-8192",
            messages: [
              {
                role: "system",
                content:
                  "You are a senior engineer that finds bugs in code and suggests clear fixes.",
              },
              {
                role: "user",
                content: `Language: ${language || "auto"}\nCode:\n${code}`,
              },
            ],
            temperature: 0.3,
          }),
        },
      );
      const data = await response.json();
      setResult(data.choices?.[0]?.message?.content?.trim() || "No result");
    } catch (_e) {
      setResult("Failed to analyze code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-purple-900 via-ai-blue-900 to-ai-pink-900">
      <Navigation />

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-ai-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-ai-pink-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-ai-pink-400 to-ai-purple-400 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Code className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-ai-pink-300 to-ai-purple-300 bg-clip-text text-transparent">
                Code Debugger
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              AI-powered bug detection and fix suggestions with detailed
              explanations for your code
            </p>
          </div>

          {/* Main Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Code className="w-5 h-5 mr-3" />
                    Submit Your Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Code Input Methods */}
                  <div className="space-y-4">
                    <label
                      htmlFor="code-upload"
                      className="text-center p-8 border-2 border-dashed border-white/30 rounded-xl hover:border-ai-pink-400/50 transition-colors cursor-pointer block"
                    >
                      <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">
                        Upload Code File
                      </h3>
                      <p className="text-white/70 text-sm">
                        Support for .txt, .js, .py, .java, .cpp and more
                      </p>
                      <input
                        id="code-upload"
                        type="file"
                        accept=".txt,.js,.ts,.py,.java,.cpp,.c,.cs,.php,.rb,.go"
                        onChange={handleFile}
                        className="hidden"
                      />
                    </label>

                    <div className="text-center text-white/60">OR</div>

                    <div className="space-y-3">
                      <label className="block text-white/90 font-medium">
                        Paste Your Code
                      </label>
                      <Textarea
                        placeholder="Paste your code here..."
                        rows={12}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:border-ai-pink-400 focus:outline-none resize-none font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-white/90 font-medium">
                      Programming Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-ai-pink-400 focus:outline-none"
                    >
                      <option value="">Auto-detect</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="csharp">C#</option>
                      <option value="php">PHP</option>
                      <option value="ruby">Ruby</option>
                      <option value="go">Go</option>
                    </select>
                  </div>

                  <Button
                    onClick={handleRun}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-ai-pink-500 to-ai-purple-500 hover:from-ai-pink-400 hover:to-ai-purple-400 text-white py-3 rounded-xl font-semibold"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {loading ? "Scanning..." : "Run AI Bug Scan"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Output Preview */}
            <div className="space-y-6">
              <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <FileText className="w-5 h-5 mr-3" />
                    Analysis Report Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-medium">
                          Critical Issues
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">
                        Memory leaks, null pointer exceptions, security
                        vulnerabilities
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bug className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">
                          Code Improvements
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">
                        Performance optimizations, best practices, refactoring
                        suggestions
                      </p>
                    </div>

                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">
                          Good Practices
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">
                        Well-structured code, proper naming conventions, good
                        documentation
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <h4 className="text-white font-semibold mb-4">
                      Report Includes:
                    </h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-ai-pink-400 rounded-full"></div>
                        <span>Original code with line numbers</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-ai-pink-400 rounded-full"></div>
                        <span>Highlighted problematic sections</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-ai-pink-400 rounded-full"></div>
                        <span>Detailed fix suggestions</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-ai-pink-400 rounded-full"></div>
                        <span>Best practice recommendations</span>
                      </li>
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report (Word)
                  </Button>

                  {result && (
                    <Textarea
                      readOnly
                      rows={10}
                      value={result}
                      className="mt-6 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-ai-pink-400 focus:outline-none resize-none font-mono text-sm"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Search,
                title: "Deep Analysis",
                desc: "Advanced AI algorithms scan every line for potential issues",
                gradient: "from-ai-pink-500 to-ai-purple-500",
              },
              {
                icon: FileText,
                title: "Detailed Reports",
                desc: "Comprehensive documentation with line references",
                gradient: "from-ai-purple-500 to-ai-blue-500",
              },
              {
                icon: CheckCircle,
                title: "Fix Suggestions",
                desc: "Actionable solutions with code examples and explanations",
                gradient: "from-ai-blue-500 to-ai-pink-500",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`glass border-white/20 backdrop-blur-xl animate-slide-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm">{feature.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center">
            <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-ai-pink-400 to-ai-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Revolutionary AI Debugging Coming Soon!
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  Our advanced AI is learning to understand code like a senior
                  developer. Get ready for intelligent bug detection and
                  human-like explanations.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <Badge className="bg-ai-pink-500/20 text-ai-pink-300 border-ai-pink-500/30 px-4 py-2">
                    Multi-Language Support
                  </Badge>
                  <Badge className="bg-ai-purple-500/20 text-ai-purple-300 border-ai-purple-500/30 px-4 py-2">
                    Security Analysis
                  </Badge>
                  <Badge className="bg-ai-blue-500/20 text-ai-blue-300 border-ai-blue-500/30 px-4 py-2">
                    Performance Optimization
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                    Real-time Feedback
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

export default Debugger;

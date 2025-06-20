import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Building, User, Sparkles } from "lucide-react";

const EmailGenerator = () => {
  const [purpose, setPurpose] = useState<"business" | "job">("business");
  const [senderName, setSenderName] = useState("");
  const [fieldTwo, setFieldTwo] = useState("");
  const [fieldThree, setFieldThree] = useState("");
  const [details, setDetails] = useState("");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
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
                content: "You craft short persuasive cold emails.",
              },
              {
                role: "user",
                content: `Write a ${tone.toLowerCase()} cold email for ${
                  purpose === "business" ? "business promotion" : "job hunting"
                }.\nSender: ${senderName}\n${
                  purpose === "business"
                    ? `Target Audience: ${fieldTwo}\nProduct/Business: ${fieldThree}`
                    : `Your Role/Expertise: ${fieldTwo}\nTarget Role: ${fieldThree}`
                }\nDetails: ${details}`,
              },
            ],
            temperature: 0.7,
          }),
        }
      );
      const data = await response.json();
      setResult(data.choices?.[0]?.message?.content?.trim() || "No result");
    } catch (_e) {
      setResult("Failed to generate email");
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
          className="absolute bottom-20 right-20 w-96 h-96 bg-ai-blue-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-ai-purple-400 to-ai-blue-400 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-ai-purple-300 to-ai-blue-300 bg-clip-text text-transparent">
                Email Generator
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Create compelling cold emails powered by AI for business promotion
              or job hunting
            </p>
          </div>

          {/* Purpose Selection */}
          <div className="mb-12">
            <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
              <CardHeader>
                <CardTitle className="text-white text-center text-2xl">
                  What's your purpose?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Promotion */}
                  <div className="group cursor-pointer" onClick={() => setPurpose('business')}>
                    <Card
                      className={`glass border-white/30 hover:border-ai-purple-400/50 transition-all duration-300 hover:scale-105 ${
                        purpose === 'business' ? 'ring-2 ring-ai-purple-400' : ''
                      }`}
                    >
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-ai-purple-500 to-ai-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                          <Building className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Promote Business
                        </h3>
                        <p className="text-white/70 mb-6">
                          Generate professional emails to promote your business,
                          products, or services to potential clients
                        </p>
                        <Badge className="bg-ai-purple-500/20 text-ai-purple-300 border-ai-purple-500/30">
                          Business Growth
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Job Hunting */}
                  <div className="group cursor-pointer" onClick={() => setPurpose('job')}>
                    <Card
                      className={`glass border-white/30 hover:border-ai-blue-400/50 transition-all duration-300 hover:scale-105 ${
                        purpose === 'job' ? 'ring-2 ring-ai-blue-400' : ''
                      }`}
                    >
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-ai-blue-500 to-ai-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Job Hunting
                        </h3>
                        <p className="text-white/70 mb-6">
                          Create personalized emails to reach out to potential
                          employers and stand out from the crowd
                        </p>
                        <Badge className="bg-ai-blue-500/20 text-ai-blue-300 border-ai-blue-500/30">
                          Career Advancement
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email Form */}
          <div className="mb-12">
            <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" /> Generate Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-white/90">
                    {purpose === "business"
                      ? "Your Name/Company Name"
                      : "Your Name"}
                  </Label>
                  <Input
                    placeholder={
                      purpose === "business"
                        ? "Eg. John Doe or ABC Enterprises"
                        : "Eg. John Doe"
                    }
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-ai-purple-400 focus:bg-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90">
                    {purpose === "business"
                      ? "Target Audience"
                      : "Your Role/Expertise"}
                  </Label>
                  <Input
                    placeholder={
                      purpose === "business"
                        ? "Eg. Life Coaches or Distributors"
                        : "Eg. Business Analyst or Python Expert"
                    }
                    value={fieldTwo}
                    onChange={(e) => setFieldTwo(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-ai-purple-400 focus:bg-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90">
                    {purpose === "business" ? "Product/Business" : "Target Role"}
                  </Label>
                  <Input
                    placeholder={
                      purpose === "business"
                        ? "Explain about your product or business briefly"
                        : "Explain the role you're targeting"
                    }
                    value={fieldThree}
                    onChange={(e) => setFieldThree(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-ai-purple-400 focus:bg-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90">Additional Details</Label>
                  <Textarea
                    rows={4}
                    placeholder="Share details you want highlighted"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:border-ai-purple-400 focus:outline-none resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/90">
                    Tone (1. Professional 2. Smart 3. Casual 4. Persuasive 5.
                    Formal)
                  </Label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-ai-purple-400 focus:outline-none"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Smart">Smart</option>
                    <option value="Casual">Casual</option>
                    <option value="Persuasive">Persuasive</option>
                    <option value="Formal">Formal</option>
                  </select>
                </div>
                <div className="text-center">
                  <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-gradient-to-r from-ai-purple-500 to-ai-blue-500 hover:from-ai-purple-400 hover:to-ai-blue-400 text-white px-8 py-3 rounded-xl font-semibold"
                  >
                    {loading ? "Generating..." : "Generate Email"}
                  </Button>
                </div>
                {result && (
                  <Textarea
                    readOnly
                    rows={10}
                    value={result}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-ai-purple-400 focus:outline-none resize-none"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateEmail } from "@/lib/groqClient";
import { Mail, Building, User, Sparkles } from "lucide-react";

const EmailGenerator = () => {
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [details, setDetails] = useState("");
  const [generated, setGenerated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `You are an expert email copywriter. Write a ${tone} email. Purpose: ${purpose}. Audience: ${audience}. Key points: ${details}.`;
    setLoading(true);
    try {
      const email = await generateEmail(prompt);
      setGenerated(email);
    } catch (err) {
      console.error(err);
      setGenerated("Failed to generate email.");
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
                  <div className="group cursor-pointer">
                    <Card className="glass border-white/30 hover:border-ai-purple-400/50 transition-all duration-300 hover:scale-105">
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
                  <div className="group cursor-pointer">
                    <Card className="glass border-white/30 hover:border-ai-blue-400/50 transition-all duration-300 hover:scale-105">
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
          <div className="text-center">
            <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Generate Email</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2 text-left">
                    <Label htmlFor="purpose" className="text-white/90">
                      Purpose
                    </Label>
                    <Input
                      id="purpose"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="e.g. Promote new product"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-ai-purple-400"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <Label htmlFor="audience" className="text-white/90">
                      Audience
                    </Label>
                    <Input
                      id="audience"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="Who will receive this email?"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-ai-purple-400"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <Label htmlFor="tone" className="text-white/90">
                      Tone
                    </Label>
                    <Input
                      id="tone"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      placeholder="e.g. Friendly, professional"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-ai-purple-400"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <Label htmlFor="details" className="text-white/90">
                      Key Points
                    </Label>
                    <Textarea
                      id="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Any additional details to include"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-ai-purple-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-ai-purple-500 to-ai-blue-500 hover:from-ai-purple-400 hover:to-ai-blue-400 text-white px-8 py-3 rounded-xl font-semibold"
                  >
                    {loading ? "Generating..." : "Generate Email"}
                  </Button>
                </form>
                {generated && (
                  <div className="mt-8 text-left">
                    <h3 className="text-white font-semibold mb-2">Preview</h3>
                    <div className="whitespace-pre-wrap bg-white/10 text-white p-4 rounded-lg">
                      {generated}
                    </div>
                  </div>
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

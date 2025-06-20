import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Building, User, Sparkles } from "lucide-react";

const EmailGenerator = () => {
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

          {/* Coming Soon Notice */}
          <div className="text-center">
            <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-ai-purple-400 to-ai-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Coming Soon!
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  We're putting the finishing touches on this powerful email
                  generation tool. It will include AI-powered personalization,
                  tone adjustment, and direct sending capabilities.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <Badge className="bg-ai-purple-500/20 text-ai-purple-300 border-ai-purple-500/30 px-4 py-2">
                    AI Personalization
                  </Badge>
                  <Badge className="bg-ai-blue-500/20 text-ai-blue-300 border-ai-blue-500/30 px-4 py-2">
                    Tone Adjustment
                  </Badge>
                  <Badge className="bg-ai-pink-500/20 text-ai-pink-300 border-ai-pink-500/30 px-4 py-2">
                    Direct Sending
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                    Performance Analytics
                  </Badge>
                </div>
                <Button className="bg-gradient-to-r from-ai-purple-500 to-ai-blue-500 hover:from-ai-purple-400 hover:to-ai-blue-400 text-white px-8 py-3 rounded-xl font-semibold">
                  Get Notified When Ready
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;

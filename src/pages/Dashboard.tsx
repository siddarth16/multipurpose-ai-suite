import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  FileText,
  Code,
  BarChart3,
  Settings,
  Moon,
  Sun,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Emails Generated",
      value: "24",
      change: "+12%",
      icon: Mail,
      color: "from-ai-purple-500 to-ai-blue-500",
    },
    {
      title: "Resumes Checked",
      value: "8",
      change: "+25%",
      icon: FileText,
      color: "from-ai-blue-500 to-ai-pink-500",
    },
    {
      title: "Code Debugged",
      value: "15",
      change: "+8%",
      icon: Code,
      color: "from-ai-pink-500 to-ai-purple-500",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+3%",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const recentActivity = [
    {
      type: "email",
      title: "Cold Email for Tech Startup",
      time: "2 hours ago",
      status: "sent",
    },
    {
      type: "resume",
      title: "Software Engineer Resume",
      time: "5 hours ago",
      status: "optimized",
    },
    {
      type: "debug",
      title: "React Component Debug",
      time: "1 day ago",
      status: "fixed",
    },
  ];

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Welcome Back!
                </h1>
                <p className="text-white/70 text-lg">
                  Here's what's happening with your AI tools today
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                >
                  <Sun className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className={`glass border-white/20 backdrop-blur-xl animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-sm font-medium">
                          {stat.title}
                        </p>
                        <p className="text-white text-2xl font-bold">
                          {stat.value}
                        </p>
                        <p className="text-green-400 text-sm font-medium">
                          {stat.change} from last week
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-ai-purple-500 to-ai-blue-500 rounded-lg flex items-center justify-center">
                          {activity.type === "email" && (
                            <Mail className="w-5 h-5 text-white" />
                          )}
                          {activity.type === "resume" && (
                            <FileText className="w-5 h-5 text-white" />
                          )}
                          {activity.type === "debug" && (
                            <Code className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">
                            {activity.title}
                          </p>
                          <p className="text-white/60 text-sm">
                            {activity.time}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            activity.status === "sent"
                              ? "bg-green-500/20 text-green-400"
                              : activity.status === "optimized"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {activity.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => navigate("/tools/email-generator")}
                    className="w-full bg-gradient-to-r from-ai-purple-500 to-ai-blue-500 hover:from-ai-purple-400 hover:to-ai-blue-400 text-white"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Generate Email
                  </Button>
                  <Button
                    onClick={() => navigate("/tools/resume")}
                    className="w-full bg-gradient-to-r from-ai-blue-500 to-ai-pink-500 hover:from-ai-blue-400 hover:to-ai-pink-400 text-white"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Check Resume
                  </Button>
                  <Button
                    onClick={() => navigate("/tools/debugger")}
                    className="w-full bg-gradient-to-r from-ai-pink-500 to-ai-purple-500 hover:from-ai-pink-400 hover:to-ai-purple-400 text-white"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Debug Code
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass border-white/20 backdrop-blur-xl animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Usage This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-white/80 text-sm mb-2">
                        <span>Email Generator</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-ai-purple-500 to-ai-blue-500 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-white/80 text-sm mb-2">
                        <span>Resume Tools</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-ai-blue-500 to-ai-pink-500 h-2 rounded-full w-1/2"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-white/80 text-sm mb-2">
                        <span>Code Debugger</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-ai-pink-500 to-ai-purple-500 h-2 rounded-full w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

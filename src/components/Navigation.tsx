import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import {
  Sparkles,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/tools", label: "Tools", icon: Sparkles },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  const toolsSubmenu = [
    { path: "/tools/email-generator", label: "Email Generator" },
    { path: "/tools/resume", label: "Resume Tools" },
    { path: "/tools/debugger", label: "Code Debugger" },
  ];

  const isToolsPage = location.pathname.startsWith("/tools");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-ai-purple-400 to-ai-blue-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              AI Suite
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              if (item.path === "/tools") {
                return (
                  <DropdownMenu key={item.path}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`
                          flex items-center space-x-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300
                          ${isToolsPage ? "text-white bg-white/10" : ""}
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-md border-gray-700">
                      {toolsSubmenu.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem.path}
                          className="text-white hover:bg-white/10 cursor-pointer"
                          onClick={() => navigate(subItem.path)}
                        >
                          {subItem.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`
                    flex items-center space-x-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300
                    ${isActive ? "text-white bg-white/10" : ""}
                  `}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}

            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-red-500/20 transition-all duration-300"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                if (item.path === "/tools") {
                  return (
                    <div key={item.path} className="space-y-2">
                      <div className="flex items-center space-x-2 text-white/80 px-3 py-2">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="pl-6 space-y-1">
                        {toolsSubmenu.map((subItem) => (
                          <Button
                            key={subItem.path}
                            variant="ghost"
                            className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10"
                            onClick={() => {
                              navigate(subItem.path);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {subItem.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={`
                      w-full justify-start flex items-center space-x-2 text-white/80 hover:text-white hover:bg-white/10
                      ${isActive ? "text-white bg-white/10" : ""}
                    `}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}

              <Button
                variant="ghost"
                className="w-full justify-start text-white/80 hover:text-white hover:bg-red-500/20"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

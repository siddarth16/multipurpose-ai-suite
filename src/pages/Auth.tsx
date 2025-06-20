import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
} from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: signinEmail,
      password: signinPassword,
    });
    if (error) {
      toast({ title: error.message });
    } else {
      navigate("/dashboard");
    }
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
      options: {
        data: { firstName, lastName, phone, country },
      },
    });
    if (error) {
      toast({ title: error.message });
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: signUpEmail,
        password: signUpPassword,
      });
      if (signInError) {
        toast({ title: signInError.message });
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-purple-900 via-ai-blue-900 to-ai-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-ai-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-ai-blue-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Back to home button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
            {/* Sign In Section */}
            <div className="flex items-center justify-center p-8 animate-slide-in-left">
              <div className="w-full max-w-md">
                <div className="glass p-8 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-white/70">
                      Sign in to continue your AI journey
                    </p>
                  </div>

                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-white/90">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signinEmail}
                          onChange={(e) => setSigninEmail(e.target.value)}
                          className={`
                            pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50
                            focus:bg-white/20 focus:border-ai-purple-400 transition-all duration-300
                            ${focusedField === "signin-email" ? "ring-2 ring-ai-purple-400/50" : ""}
                          `}
                          onFocus={() => setFocusedField("signin-email")}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signin-password"
                        className="text-white/90"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={signinPassword}
                          onChange={(e) => setSigninPassword(e.target.value)}
                          className={`
                            pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50
                            focus:bg-white/20 focus:border-ai-purple-400 transition-all duration-300
                            ${focusedField === "signin-password" ? "ring-2 ring-ai-purple-400/50" : ""}
                          `}
                          onFocus={() => setFocusedField("signin-password")}
                          onBlur={() => setFocusedField(null)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <a
                        href="#"
                        className="text-ai-purple-300 hover:text-ai-purple-200 text-sm transition-colors"
                      >
                        Forgot Password?
                      </a>
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-ai-purple-500 to-ai-blue-500 hover:from-ai-purple-400 hover:to-ai-blue-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      onClick={handleSignIn}
                    >
                      Sign In
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sign Up Section */}
            <div className="flex items-center justify-center p-8 animate-slide-in-right">
              <div className="w-full max-w-md">
                <div className="glass p-8 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Join Us Today
                    </h2>
                    <p className="text-white/70">
                      Create your account and explore AI tools
                    </p>
                  </div>

                  <form className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstname" className="text-white/90">
                          First Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                          <Input
                            id="firstname"
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`
                              pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50
                              focus:bg-white/20 focus:border-ai-blue-400 transition-all duration-300
                              ${focusedField === "firstname" ? "ring-2 ring-ai-blue-400/50" : ""}
                            `}
                            onFocus={() => setFocusedField("firstname")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastname" className="text-white/90">
                          Last Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                          <Input
                            id="lastname"
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`
                              pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50
                              focus:bg-white/20 focus:border-ai-blue-400 transition-all duration-300
                              ${focusedField === "lastname" ? "ring-2 ring-ai-blue-400/50" : ""}
                            `}
                            onFocus={() => setFocusedField("lastname")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white/90">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="john.doe@example.com"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          className={`
                            pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50
                            focus:bg-white/20 focus:border-ai-blue-400 transition-all duration-300
                            ${focusedField === "signup-email" ? "ring-2 ring-ai-blue-400/50" : ""}
                          `}
                          onFocus={() => setFocusedField("signup-email")}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signup-password"
                        className="text-white/90"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <Input
                          id="signup-password"
                          type={showSignUpPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          className={`
                            pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50
                            focus:bg-white/20 focus:border-ai-blue-400 transition-all duration-300
                            ${focusedField === "signup-password" ? "ring-2 ring-ai-blue-400/50" : ""}
                          `}
                          onFocus={() => setFocusedField("signup-password")}
                          onBlur={() => setFocusedField(null)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                          onClick={() =>
                            setShowSignUpPassword(!showSignUpPassword)
                          }
                        >
                          {showSignUpPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white/90">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`
                            pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50
                            focus:bg-white/20 focus:border-ai-blue-400 transition-all duration-300
                            ${focusedField === "phone" ? "ring-2 ring-ai-blue-400/50" : ""}
                          `}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-white/90">
                        Country
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-10" />
                        <Select onValueChange={(val) => setCountry(val)}>
                          <SelectTrigger className="pl-10 bg-white/10 border-white/20 text-white focus:bg-white/20 focus:border-ai-blue-400">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                            <SelectItem value="fr">France</SelectItem>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="jp">Japan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-ai-blue-500 to-ai-pink-500 hover:from-ai-blue-400 hover:to-ai-pink-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      onClick={handleSignUp}
                    >
                      Create Account
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

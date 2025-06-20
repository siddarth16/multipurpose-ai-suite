import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/hooks/useAuth";
import Greeting from "./pages/Greeting";
import Auth from "./pages/Auth";
import Tools from "./pages/Tools";
import EmailGenerator from "./pages/EmailGenerator";
import Resume from "./pages/Resume";
import Debugger from "./pages/Debugger";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Greeting />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/tools"
              element={
                <ProtectedRoute>
                  <Tools />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tools/email-generator"
              element={
                <ProtectedRoute>
                  <EmailGenerator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tools/resume"
              element={
                <ProtectedRoute>
                  <Resume />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tools/debugger"
              element={
                <ProtectedRoute>
                  <Debugger />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

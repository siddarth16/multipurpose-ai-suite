import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/email-generator" element={<EmailGenerator />} />
          <Route path="/tools/resume" element={<Resume />} />
          <Route path="/tools/debugger" element={<Debugger />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

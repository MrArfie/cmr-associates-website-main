
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Files from "./pages/Files";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AiAssistant from "./pages/AiAssistant";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Sidebar from "./components/layout/Sidebar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <div className="min-h-screen flex w-full">
                  <Sidebar />
                  <Index />
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/files" element={
              <ProtectedRoute>
                <div className="min-h-screen flex w-full">
                  <Sidebar />
                  <Files />
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/clients" element={
              <ProtectedRoute>
                <div className="min-h-screen flex w-full">
                  <Sidebar />
                  <Clients />
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/ai-assistant" element={
              <ProtectedRoute>
                <div className="min-h-screen flex w-full">
                  <Sidebar />
                  <AiAssistant />
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <div className="min-h-screen flex w-full">
                  <Sidebar />
                  <Settings />
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

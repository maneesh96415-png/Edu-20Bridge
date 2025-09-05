import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "@/layouts/AppLayout";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/store/auth";
import BridgeHubLanding from "@/features/bridgehub/Landing";
import MentorsPage from "@/features/bridgehub/Mentors";
import SessionsPage from "@/features/bridgehub/Sessions";
import ForumPage from "@/features/bridgehub/Forum";
import ResourcesPage from "@/features/bridgehub/Resources";
import LeaderboardPage from "@/features/bridgehub/Leaderboard";
import CodeTranslatePage from "@/features/codetranslate/CodeTranslate";
import ExplainerBotPage from "@/features/explainerbot/ExplainerBot";
import CareerExplorerPage from "@/features/career/CareerExplorer";
import AuthPage from "@/pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/bridgehub" element={<BridgeHubLanding />} />
                <Route path="/bridgehub/mentors" element={<MentorsPage />} />
                <Route path="/bridgehub/sessions" element={<SessionsPage />} />
                <Route path="/bridgehub/forum" element={<ForumPage />} />
                <Route path="/bridgehub/resources" element={<ResourcesPage />} />
                <Route path="/bridgehub/leaderboard" element={<LeaderboardPage />} />
                <Route path="/code-translate" element={<CodeTranslatePage />} />
                <Route path="/explainer-bot" element={<ExplainerBotPage />} />
                <Route path="/career-explorer" element={<CareerExplorerPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

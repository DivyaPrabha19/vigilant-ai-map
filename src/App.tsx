import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "./pages/LoginPage";
import PermissionsPage from "./pages/PermissionsPage";
import HomePage from "./pages/HomePage";
import CrimeMapPage from "./pages/CrimeMapPage";
import RoutePlannerPage from "./pages/RoutePlannerPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import EmergencyPage from "./pages/EmergencyPage";
import DistrictCrimePage from "./pages/DistrictCrimePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/permissions" element={<PermissionsPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<CrimeMapPage />} />
          <Route path="/routes" element={<RoutePlannerPage />} />
          <Route path="/news" element={<NewsFeedPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/district/:districtName" element={<DistrictCrimePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

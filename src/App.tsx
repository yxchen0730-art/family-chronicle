import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Families from "./pages/Families";
import CreateFamily from "./pages/CreateFamily";
import Photos from "./pages/Photos";
import Timeline from "./pages/Timeline";
import People from "./pages/People";
import PersonDetail from "./pages/PersonDetail";
import FamilyTree from "./pages/FamilyTree";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PhotoDetailPage from "./pages/PhotoDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/families" element={<Families />} />
            <Route path="/families/create" element={<CreateFamily />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/photos/:id" element={<PhotoDetailPage />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/:id" element={<PersonDetail />} />
            <Route path="/family-tree" element={<FamilyTree />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

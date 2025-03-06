
import { useState } from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentFiles from "@/components/dashboard/RecentFiles";
import ClientsList from "@/components/dashboard/ClientsList";
import FileGrid from "@/components/files/FileGrid";
import IntegrationsPanel from "@/components/integration/IntegrationsPanel";
import SearchBar from "@/components/ui/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Header from "@/components/layout/Header";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-b from-background to-background/80">
      <div className="flex-1 flex flex-col ml-[240px]">
        <Header />
        <main className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <div className="mb-2">
              <h1 className="text-3xl font-bold">Welcome back, {user?.name.split(" ")[0]}</h1>
              <p className="text-muted-foreground">Manage your accounting files and automate tasks</p>
            </div>
            
            <div className="mt-6">
              <SearchBar />
            </div>
          </div>
          
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="glass">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
              <DashboardStats />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentFiles />
                <ClientsList />
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="animate-fade-in">
              <FileGrid />
            </TabsContent>
            
            <TabsContent value="integrations" className="animate-fade-in">
              <IntegrationsPanel />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;

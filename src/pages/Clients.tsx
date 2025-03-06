
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchBar from "@/components/ui/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  UserPlus, 
  Filter, 
  Download, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  Clock,
  FileCheck,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

type ClientStatus = "active" | "pending" | "completed";
type TaxFileStatus = "not-started" | "processing" | "almost-ready" | "completed";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
  taxFileStatus: TaxFileStatus;
  taxReturns: number;
  image?: string;
}

const getTaxStatusText = (status: TaxFileStatus) => {
  switch (status) {
    case "not-started": return "Not Started";
    case "processing": return "Processing";
    case "almost-ready": return "Almost Ready";
    case "completed": return "Completed";
    default: return "Unknown";
  }
};

const getTaxStatusIcon = (status: TaxFileStatus) => {
  switch (status) {
    case "not-started": return <Circle className="h-4 w-4 text-gray-500" />;
    case "processing": return <Clock className="h-4 w-4 text-blue-500" />;
    case "almost-ready": return <FileCheck className="h-4 w-4 text-amber-500" />;
    case "completed": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default: return <Circle className="h-4 w-4" />;
  }
};

const getTaxStatusColor = (status: TaxFileStatus) => {
  switch (status) {
    case "not-started": return "bg-gray-500/10 text-gray-600 border-gray-200";
    case "processing": return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "almost-ready": return "bg-amber-500/10 text-amber-600 border-amber-200";
    case "completed": return "bg-green-500/10 text-green-600 border-green-200";
    default: return "";
  }
};

const Clients = () => {
  const [clients] = useState<Client[]>([
    { 
      id: "1", 
      name: "Robert Johnson", 
      email: "robert@johnsonllc.com", 
      phone: "(555) 123-4567", 
      company: "Johnson LLC", 
      status: "active", 
      taxFileStatus: "processing",
      taxReturns: 3 
    },
    { 
      id: "2", 
      name: "Susan Smith", 
      email: "susan@smithenterprises.com", 
      phone: "(555) 234-5678", 
      company: "Smith Enterprises", 
      status: "pending", 
      taxFileStatus: "not-started",
      taxReturns: 1 
    },
    { 
      id: "3", 
      name: "David Lee", 
      email: "david@acmecorp.com", 
      phone: "(555) 345-6789", 
      company: "Acme Corporation", 
      status: "completed", 
      taxFileStatus: "completed",
      taxReturns: 2 
    },
    { 
      id: "4", 
      name: "Maria Garcia", 
      email: "maria@techstart.com", 
      phone: "(555) 456-7890", 
      company: "Tech Startups Inc", 
      status: "active", 
      taxFileStatus: "almost-ready",
      taxReturns: 2 
    },
    { 
      id: "5", 
      name: "James Wilson", 
      email: "james@wilsongroup.com", 
      phone: "(555) 567-8901", 
      company: "Wilson Group", 
      status: "active", 
      taxFileStatus: "processing",
      taxReturns: 1 
    },
    { 
      id: "6", 
      name: "Patricia Moore", 
      email: "patricia@mooreservices.com", 
      phone: "(555) 678-9012", 
      company: "Moore Professional Services", 
      status: "completed", 
      taxFileStatus: "completed",
      taxReturns: 4 
    },
    { 
      id: "7", 
      name: "Michael Taylor", 
      email: "michael@taylorconsulting.com", 
      phone: "(555) 789-0123", 
      company: "Taylor Consulting", 
      status: "pending", 
      taxFileStatus: "not-started",
      taxReturns: 1 
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const addNewClient = () => {
    toast.success("New client form opened");
  };

  const exportClientList = () => {
    toast.success("Client list exported successfully");
  };

  const viewClient = (id: string) => {
    toast.info(`Viewing client ${id}`);
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-b from-background to-background/80">
      <div className="flex-1 flex flex-col ml-[240px]">
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground">Manage your client accounts and tax returns</p>
          </div>

          <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <SearchBar />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" onClick={exportClientList} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden md:inline">Export</span>
              </Button>
              <Button onClick={addNewClient} className="gap-2">
                <UserPlus className="h-4 w-4" />
                <span className="hidden md:inline">Add Client</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="glass">
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card className="glass-card animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Client List</CardTitle>
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Search clients..." 
                  className="max-w-xs" 
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-6 p-4 bg-muted/50 font-medium text-sm">
                  <div className="md:col-span-2">Name</div>
                  <div className="hidden md:block">Status</div>
                  <div className="hidden md:block">US Tax Filing</div>
                  <div className="hidden md:block">Tax Returns</div>
                  <div className="text-right">Actions</div>
                </div>
                
                <div className="divide-y">
                  {clients
                    .filter(client => {
                      if (activeTab === "all") return true;
                      return client.status === activeTab;
                    })
                    .map((client) => (
                      <div key={client.id} className="grid grid-cols-1 md:grid-cols-6 p-4 items-center">
                        <div className="md:col-span-2 flex items-center space-x-3 mb-2 md:mb-0">
                          <Avatar>
                            <AvatarImage src={client.image} />
                            <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-sm">{client.name}</h4>
                            <p className="text-xs text-muted-foreground">{client.email}</p>
                          </div>
                        </div>
                        
                        <div className="hidden md:flex">
                          {client.status === "active" && (
                            <Badge className="bg-blue-500/10 text-blue-600 border border-blue-200">Active</Badge>
                          )}
                          {client.status === "pending" && (
                            <Badge className="bg-amber-500/10 text-amber-600 border border-amber-200">Pending</Badge>
                          )}
                          {client.status === "completed" && (
                            <Badge className="bg-green-500/10 text-green-600 border border-green-200">Completed</Badge>
                          )}
                        </div>
                        
                        <div className="hidden md:flex items-center">
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getTaxStatusColor(client.taxFileStatus)}`}>
                            {getTaxStatusIcon(client.taxFileStatus)}
                            <span className="ml-1">{getTaxStatusText(client.taxFileStatus)}</span>
                          </span>
                        </div>
                        
                        <div className="hidden md:flex items-center">
                          <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{client.taxReturns}</span>
                        </div>
                        
                        <div className="flex justify-end items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => viewClient(client.id)}>
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Clients;

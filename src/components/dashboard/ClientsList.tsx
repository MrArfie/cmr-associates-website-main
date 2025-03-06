
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, Circle, AlertCircle, Clock, DollarSign, FileCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ClientStatus = "active" | "pending" | "completed";
type TaxFileStatus = "not-started" | "processing" | "almost-ready" | "completed";

interface ClientProps {
  name: string;
  email: string;
  status: ClientStatus;
  taxFileStatus: TaxFileStatus;
  taxReturns: number;
  image?: string;
}

const StatusIcon = ({ status }: { status: ClientStatus }) => {
  switch (status) {
    case "active":
      return <Circle className="h-4 w-4 text-blue-500 fill-blue-100" />;
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500 fill-green-100" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-amber-500 fill-amber-100" />;
    default:
      return <Circle className="h-4 w-4" />;
  }
};

const StatusBadge = ({ status }: { status: ClientStatus }) => {
  switch (status) {
    case "active":
      return <Badge className="bg-blue-500/10 text-blue-600 border border-blue-200 hover:bg-blue-500/20">Active</Badge>;
    case "completed":
      return <Badge className="bg-green-500/10 text-green-600 border border-green-200 hover:bg-green-500/20">Completed</Badge>;
    case "pending":
      return <Badge className="bg-amber-500/10 text-amber-600 border border-amber-200 hover:bg-amber-500/20">Pending</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const TaxFileStatusIcon = ({ status }: { status: TaxFileStatus }) => {
  switch (status) {
    case "not-started":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Circle className="h-4 w-4 text-gray-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Not Started</p>
          </TooltipContent>
        </Tooltip>
      );
    case "processing":
      return (
        <Tooltip>
          <TooltipTrigger>
            <Clock className="h-4 w-4 text-blue-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Processing</p>
          </TooltipContent>
        </Tooltip>
      );
    case "almost-ready":
      return (
        <Tooltip>
          <TooltipTrigger>
            <FileCheck className="h-4 w-4 text-amber-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Almost Ready</p>
          </TooltipContent>
        </Tooltip>
      );
    case "completed":
      return (
        <Tooltip>
          <TooltipTrigger>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Completed</p>
          </TooltipContent>
        </Tooltip>
      );
    default:
      return <Circle className="h-4 w-4" />;
  }
};

const ClientItem = ({ name, email, status, taxFileStatus, taxReturns, image }: ClientProps) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium text-sm">{name}</h4>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <StatusBadge status={status} />
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
            <TaxFileStatusIcon status={taxFileStatus} />
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground">{taxReturns}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientsList = () => {
  const clients = [
    { name: "Robert Johnson", email: "robert@johnsonllc.com", status: "active" as ClientStatus, taxFileStatus: "processing" as TaxFileStatus, taxReturns: 3 },
    { name: "Susan Smith", email: "susan@smithenterprises.com", status: "pending" as ClientStatus, taxFileStatus: "not-started" as TaxFileStatus, taxReturns: 1 },
    { name: "David Lee", email: "david@acmecorp.com", status: "completed" as ClientStatus, taxFileStatus: "completed" as TaxFileStatus, taxReturns: 2 },
    { name: "Maria Garcia", email: "maria@techstart.com", status: "active" as ClientStatus, taxFileStatus: "almost-ready" as TaxFileStatus, taxReturns: 2 },
  ];

  return (
    <div className="glass-card rounded-xl animate-slide-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-semibold">Active Clients</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <div className="divide-y divide-border">
        {clients.map((client, index) => (
          <ClientItem 
            key={index}
            name={client.name}
            email={client.email}
            status={client.status}
            taxFileStatus={client.taxFileStatus}
            taxReturns={client.taxReturns}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientsList;

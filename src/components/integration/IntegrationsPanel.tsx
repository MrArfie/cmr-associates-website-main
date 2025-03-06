
import { useState } from "react";
import { Check, CloudIcon, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface IntegrationProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  lastSync?: string;
}

const IntegrationCard = ({ name, description, icon, connected, lastSync }: IntegrationProps) => {
  const [isConnected, setIsConnected] = useState(connected);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    if (!isConnected) {
      setIsLoading(true);
      // Simulate connection
      setTimeout(() => {
        setIsConnected(true);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsConnected(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-md bg-primary/10">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <Switch checked={isConnected} onCheckedChange={handleToggle} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          {isConnected ? (
            <>
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                <Check className="h-3 w-3 mr-1" /> Connected
              </Badge>
              {lastSync && (
                <span className="text-xs text-muted-foreground ml-3">
                  Last synced: {lastSync}
                </span>
              )}
            </>
          ) : (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
              <AlertCircle className="h-3 w-3 mr-1" /> Not connected
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "text-xs",
            !isConnected && "text-primary"
          )}
          disabled={isLoading}
        >
          {isConnected ? "Configure Settings" : "Connect Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const IntegrationsPanel = () => {
  const integrations = [
    {
      name: "Google Workspace",
      description: "Connect to Gmail, Drive, Calendar and Docs",
      icon: <CloudIcon className="h-5 w-5 text-blue-500" />,
      connected: true,
      lastSync: "Today at 2:30 PM"
    },
    {
      name: "QuickBooks",
      description: "Connect to your accounting and bookkeeping",
      icon: <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm-1.5 18l-6-3.27v-7.5l6 3.27v7.5zm1.5-9l-6-3 6-3 6 3-6 3zm7.5 5.73l-6 3.27v-7.5l6-3.27v7.5z"/>
      </svg>,
      connected: false
    },
    {
      name: "Xero",
      description: "Connect to Xero accounting platform",
      icon: <svg className="h-5 w-5 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.87 22a8.46 8.46 0 0 0 3.13-1.18v-6.23l-6.26 3.63-6.26-3.63v6.23a8.46 8.46 0 0 0 3.13 1.18h6.26zM23 7.61l-7.48-4.29a8.55 8.55 0 0 0-7 0L1 7.61l11 6.35 11-6.35zM10.47 14L1 8.73v7.11a8.47 8.47 0 0 0 3.47 6.82V16.5l6-3.47V14z"/>
      </svg>,
      connected: false
    },
    {
      name: "Microsoft 365",
      description: "Connect to OneDrive, Outlook and Office",
      icon: <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5 0v11.5H0V0h11.5zm12.5 0v11.5H12.5V0H24zM11.5 12.5V24H0V12.5h11.5zm12.5 0V24H12.5V12.5H24z"/>
      </svg>,
      connected: true,
      lastSync: "Yesterday at 6:15 PM"
    }
  ];

  return (
    <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-xl font-semibold mb-4">Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration, index) => (
          <IntegrationCard
            key={index}
            name={integration.name}
            description={integration.description}
            icon={integration.icon}
            connected={integration.connected}
            lastSync={integration.lastSync}
          />
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPanel;

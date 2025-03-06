
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Brain
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Files", href: "/files", icon: FileText },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "AI Assistant", href: "/ai-assistant", icon: Brain },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    toast.info("Logging out...");
    setTimeout(() => {
      logout();
    }, 1000);
  };

  return (
    <div
      className={`fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-[240px]"
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        {/* Logo */}
        <div className="px-4 py-5 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/3e89eeed-207d-4882-9a8f-db2c558d4f3b.png" alt="CMR Logo" className="h-8" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-sidebar-foreground">CMR</span>
                <span className="text-[10px] text-amber-500">ASSOCIATES</span>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <TooltipProvider>
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Tooltip key={item.name} delayDuration={500}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-x-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        pathname === item.href
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      <item.icon className={`h-5 w-5 flex-shrink-0 ${collapsed ? "mx-auto" : ""}`} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </TooltipProvider>
        </div>

        {/* User Profile */}
        <div className={`p-4 ${collapsed ? "text-center" : ""} border-t border-sidebar-border`}>
          {collapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-9 w-9 mx-auto mb-2 cursor-pointer">
                    <AvatarFallback className="bg-amber-500 text-white">
                      {user?.avatarInitials || "U"}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.role}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-amber-500 text-white">
                  {user?.avatarInitials || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-sidebar-foreground">{user?.name}</span>
                <span className="text-xs text-sidebar-foreground/70">
                  {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                </span>
              </div>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`mt-3 rounded-full text-sidebar-foreground/70 hover:text-sidebar-foreground ${collapsed ? "mx-auto" : "ml-auto"}`}
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

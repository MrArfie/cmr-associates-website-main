
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { 
  FileText, FileSpreadsheet, File, MoreHorizontal, 
  Star, Folder, Download, Share2, Trash2,
  Filter, SortAsc, SortDesc, Grid, List 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type FileType = "tax" | "spreadsheet" | "document" | "folder";
type ViewMode = "grid" | "list";
type SortMode = "name" | "date" | "type" | "client";
type SortDirection = "asc" | "desc";

interface FileItemProps {
  name: string;
  type: FileType;
  client: string;
  date: Date;
  size?: string;
  starred?: boolean;
  viewMode: ViewMode;
}

const FileIcon = ({ type, size = "md" }: { type: FileType; size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8"
  };
  
  const sizeClass = sizes[size];
  
  switch (type) {
    case "tax":
      return <FileText className={cn(sizeClass, "text-primary")} />;
    case "spreadsheet":
      return <FileSpreadsheet className={cn(sizeClass, "text-green-600")} />;
    case "folder":
      return <Folder className={cn(sizeClass, "text-amber-500")} />;
    default:
      return <File className={cn(sizeClass, "text-orange-500")} />;
  }
};

const GridItem = ({ name, type, client, date, size, starred = false }: Omit<FileItemProps, "viewMode">) => {
  const [isStarred, setIsStarred] = useState(starred);
  
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="p-4 pb-0 flex justify-between">
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => setIsStarred(!isStarred)}
          >
            <Star className={cn(
              "h-4 w-4", 
              isStarred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            )} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                <span>Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex flex-col items-center justify-center text-center">
        <div className="p-4 mb-2 rounded-lg bg-background/80">
          <FileIcon type={type} size="lg" />
        </div>
        <h4 className="font-medium text-sm line-clamp-1">{name}</h4>
        <p className="text-xs text-muted-foreground line-clamp-1">{client}</p>
      </CardContent>
      
      <CardFooter className="p-3 bg-accent/30 flex justify-between items-center text-xs text-muted-foreground">
        <span>{formatDistanceToNow(date, { addSuffix: true })}</span>
        {size && <span>{size}</span>}
      </CardFooter>
    </Card>
  );
};

const ListItem = ({ name, type, client, date, size, starred = false }: Omit<FileItemProps, "viewMode">) => {
  const [isStarred, setIsStarred] = useState(starred);
  
  return (
    <div className="flex items-center p-3 hover:bg-accent/50 rounded-lg transition-colors">
      <div className="p-2 bg-background/80 rounded-md mr-3">
        <FileIcon type={type} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{name}</h4>
        <p className="text-xs text-muted-foreground truncate">{client}</p>
      </div>
      
      <div className="flex items-center ml-4 space-x-4">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
        
        {size && (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {size}
          </span>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => setIsStarred(!isStarred)}
        >
          <Star className={cn(
            "h-4 w-4", 
            isStarred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
          )} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Download className="mr-2 h-4 w-4" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const FileItem = (props: FileItemProps) => {
  return props.viewMode === "grid" ? <GridItem {...props} /> : <ListItem {...props} />;
};

const FileGrid = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortMode, setSortMode] = useState<SortMode>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  
  const files = [
    { 
      name: "Tax Return 2023", 
      type: "tax" as FileType, 
      client: "Johnson LLC", 
      date: new Date(2023, 8, 10), 
      size: "1.2 MB",
      starred: true 
    },
    { 
      name: "Monthly P&L", 
      type: "spreadsheet" as FileType, 
      client: "Smith Enterprises", 
      date: new Date(2023, 8, 8), 
      size: "856 KB"
    },
    { 
      name: "Client Documents", 
      type: "folder" as FileType, 
      client: "Acme Corp", 
      date: new Date(2023, 8, 7) 
    },
    { 
      name: "Quarterly Report", 
      type: "document" as FileType, 
      client: "Acme Corp", 
      date: new Date(2023, 8, 5), 
      size: "3.1 MB"
    },
    { 
      name: "Expense Receipts", 
      type: "document" as FileType, 
      client: "TechStart Inc", 
      date: new Date(2023, 8, 3), 
      size: "4.2 MB"
    },
    { 
      name: "Payroll Summary", 
      type: "spreadsheet" as FileType, 
      client: "Johnson LLC", 
      date: new Date(2023, 8, 1), 
      size: "1.5 MB"
    },
    { 
      name: "Tax Forms", 
      type: "folder" as FileType, 
      client: "Various", 
      date: new Date(2023, 7, 28)
    },
    { 
      name: "Financial Statement", 
      type: "document" as FileType, 
      client: "Smith Enterprises", 
      date: new Date(2023, 7, 25), 
      size: "2.3 MB",
      starred: true
    },
  ];
  
  // Sort files based on current sort settings
  const sortedFiles = [...files].sort((a, b) => {
    let compareResult = 0;
    
    switch (sortMode) {
      case "name":
        compareResult = a.name.localeCompare(b.name);
        break;
      case "date":
        compareResult = b.date.getTime() - a.date.getTime();
        break;
      case "type":
        compareResult = a.type.localeCompare(b.type);
        break;
      case "client":
        compareResult = a.client.localeCompare(b.client);
        break;
    }
    
    return sortDirection === "asc" ? compareResult : -compareResult;
  });
  
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  
  const handleSortChange = (mode: SortMode) => {
    if (sortMode === mode) {
      toggleSortDirection();
    } else {
      setSortMode(mode);
      setSortDirection("asc");
    }
  };
  
  return (
    <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Files</h2>
        
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="glass">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">All Files</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Tax Returns</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Spreadsheets</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Documents</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Folders</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Starred</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="glass">
                {sortDirection === "asc" ? (
                  <SortAsc className="h-4 w-4 mr-2" />
                ) : (
                  <SortDesc className="h-4 w-4 mr-2" />
                )}
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => handleSortChange("name")}
              >
                {sortMode === "name" && (
                  sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                )}
                <span>Name</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => handleSortChange("date")}
              >
                {sortMode === "date" && (
                  sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                )}
                <span>Date</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => handleSortChange("type")}
              >
                {sortMode === "type" && (
                  sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                )}
                <span>Type</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => handleSortChange("client")}
              >
                {sortMode === "client" && (
                  sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                )}
                <span>Client</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex rounded-md overflow-hidden border border-border">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                viewMode === "grid" ? "bg-accent" : "",
                "rounded-none h-9 w-9"
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                viewMode === "list" ? "bg-accent" : "",
                "rounded-none h-9 w-9"
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedFiles.map((file, index) => (
            <FileItem
              key={index}
              viewMode={viewMode}
              {...file}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl">
          <div className="p-3 bg-muted/30 border-b border-border flex items-center">
            <span className="text-xs font-medium text-muted-foreground w-1/2">Name</span>
            <span className="text-xs font-medium text-muted-foreground flex-1">Client</span>
            <span className="text-xs font-medium text-muted-foreground text-right w-32">Date</span>
            <span className="text-xs font-medium text-muted-foreground text-right w-20">Size</span>
            <span className="w-20"></span>
          </div>
          <div className="divide-y divide-border">
            {sortedFiles.map((file, index) => (
              <FileItem
                key={index}
                viewMode={viewMode}
                {...file}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileGrid;


import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FileText, FileSpreadsheet, Download, MoreHorizontal, Star, File } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FileType = "tax" | "spreadsheet" | "document";

interface FileItemProps {
  name: string;
  client: string;
  type: FileType;
  date: Date;
  starred?: boolean;
}

const FileIcon = ({ type }: { type: FileType }) => {
  switch (type) {
    case "tax":
      return <FileText className="h-5 w-5 text-primary" />;
    case "spreadsheet":
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    default:
      return <File className="h-5 w-5 text-orange-500" />;
  }
};

const FileTypeBadge = ({ type }: { type: FileType }) => {
  switch (type) {
    case "tax":
      return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Tax Return</Badge>;
    case "spreadsheet":
      return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">Spreadsheet</Badge>;
    default:
      return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">Document</Badge>;
  }
};

const FileItem = ({ name, client, type, date, starred = false }: FileItemProps) => {
  const [isStarred, setIsStarred] = useState(starred);

  return (
    <div className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-background rounded-md">
          <FileIcon type={type} />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="font-medium text-sm">{name}</h4>
            <FileTypeBadge type={type} />
          </div>
          <p className="text-xs text-muted-foreground">{client}</p>
        </div>
      </div>

      <div className="flex items-center">
        <span className="text-xs text-muted-foreground mr-4">
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
        
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
            <DropdownMenuItem className="cursor-pointer">Share</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Rename</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const RecentFiles = () => {
  const files = [
    { name: "Tax Return 2023", client: "Johnson LLC", type: "tax" as FileType, date: new Date(2023, 8, 10), starred: true },
    { name: "Monthly P&L", client: "Smith Enterprises", type: "spreadsheet" as FileType, date: new Date(2023, 8, 8) },
    { name: "Quarterly Report", client: "Acme Corp", type: "document" as FileType, date: new Date(2023, 8, 5) },
    { name: "Expense Receipts", client: "TechStart Inc", type: "document" as FileType, date: new Date(2023, 8, 3) },
    { name: "Payroll Summary", client: "Johnson LLC", type: "spreadsheet" as FileType, date: new Date(2023, 8, 1) },
  ];

  return (
    <div className="glass-card rounded-xl animate-slide-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-semibold">Recent Files</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <div className="divide-y divide-border">
        {files.map((file, index) => (
          <FileItem 
            key={index}
            name={file.name}
            client={file.client}
            type={file.type}
            date={file.date}
            starred={file.starred}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentFiles;

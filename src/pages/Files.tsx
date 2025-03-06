
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/SearchBar";
import { FileText, FolderPlus, Filter, Clock, Calendar, Upload, Download } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FileGrid from "@/components/files/FileGrid";
import { toast } from "sonner";

const Files = () => {
  const [view, setView] = useState("grid");
  const [filterType, setFilterType] = useState("all");

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-b from-background to-background/80">
      <div className="flex-1 flex flex-col ml-[240px]">
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Files</h1>
            <p className="text-muted-foreground">Manage and organize your accounting documents</p>
          </div>

          <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <SearchBar />
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setFilterType("all")}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>All Files</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("tax")}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Tax Documents</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("bookkeeping")}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Bookkeeping</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("statements")}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Financial Statements</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Recent</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Recently Modified</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Last Week</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Last Month</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" onClick={() => toast.success("New folder created")} className="gap-2">
                <FolderPlus className="h-4 w-4" />
                <span className="hidden md:inline">New Folder</span>
              </Button>

              <Button onClick={() => toast.success("Upload initiated")} className="gap-2">
                <Upload className="h-4 w-4" />
                <span className="hidden md:inline">Upload</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList className="glass">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="tax">Tax Returns</TabsTrigger>
              <TabsTrigger value="bookkeeping">Bookkeeping</TabsTrigger>
              <TabsTrigger value="shared">Shared with Me</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card className="glass-card animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Documents</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <FileGrid />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Files;

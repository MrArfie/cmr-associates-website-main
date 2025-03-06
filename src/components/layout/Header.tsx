
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Search, 
  Upload, 
  Plus, 
  HelpCircle, 
  Settings as SettingsIcon,
  LogOut,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadFile = () => {
    if (selectedFile) {
      toast.success(`Uploaded: ${selectedFile.name}`);
      setSelectedFile(null);
      setUploadOpen(false);
    } else {
      toast.error("Please select a file first");
    }
  };

  const handleProcessDocuments = () => {
    toast.success("Document processing initiated");
    setProcessOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full px-6 py-3 glass border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <img src="/lovable-uploads/3e89eeed-207d-4882-9a8f-db2c558d4f3b.png" alt="CMR Associates Logo" className="h-8" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800 dark:text-white">CMR ASSOCIATES</span>
              <span className="text-xs text-amber-500">TAX | ACCOUNTING</span>
            </div>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search files, clients, or documents..."
              className="pl-10 pr-4 h-10 bg-white/50 dark:bg-gray-900/50 border-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-0"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          {/* Import Files Dialog */}
          <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 border-none hover:bg-white/80 dark:hover:bg-gray-900/70">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Import Files</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Import Files</DialogTitle>
                <DialogDescription>
                  Upload tax documents, receipts, or financial records.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="file-upload" className="cursor-pointer p-8 border-2 border-dashed rounded-md text-center hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Drag files here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">Supported formats: PDF, JPG, PNG, XLSX</p>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </label>
                  {selectedFile && (
                    <div className="text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      Selected: {selectedFile.name}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
                <Button onClick={handleUploadFile}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Process Documents Dialog */}
          <Dialog open={processOpen} onOpenChange={setProcessOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Process Documents</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Process Documents</DialogTitle>
                <DialogDescription>
                  Select documents to extract data and generate insights.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <div className="flex items-center p-3 border rounded-md">
                    <input type="checkbox" id="doc1" className="mr-3" />
                    <label htmlFor="doc1" className="flex-1 text-sm">client_tax_return_2023.pdf</label>
                    <span className="text-xs text-gray-500">120KB</span>
                  </div>
                  <div className="flex items-center p-3 border rounded-md">
                    <input type="checkbox" id="doc2" className="mr-3" />
                    <label htmlFor="doc2" className="flex-1 text-sm">financial_summary_Q4.xlsx</label>
                    <span className="text-xs text-gray-500">245KB</span>
                  </div>
                  <div className="flex items-center p-3 border rounded-md">
                    <input type="checkbox" id="doc3" className="mr-3" />
                    <label htmlFor="doc3" className="flex-1 text-sm">expense_receipts_march.jpg</label>
                    <span className="text-xs text-gray-500">85KB</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setProcessOpen(false)}>Cancel</Button>
                <Button onClick={handleProcessDocuments}>Process</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback className="bg-amber-500 text-white">{user?.avatarInitials || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  <span className="mt-1 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                <User className="mr-2 h-4 w-4" />
                Account Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/50" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

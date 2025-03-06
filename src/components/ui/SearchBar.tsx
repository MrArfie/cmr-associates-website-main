
import { useState, useEffect, useRef } from "react";
import { Search, FileText, Users, FileSpreadsheet, X, Clock, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const categoryIcons = {
  "files": <FileText className="h-4 w-4" />,
  "clients": <Users className="h-4 w-4" />,
  "bookkeeping": <FileSpreadsheet className="h-4 w-4" />
};

type SearchCategory = "all" | "files" | "clients" | "bookkeeping";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Q2 tax returns", 
    "Smith Enterprises", 
    "Expense receipts"
  ]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Advanced filter states
  const [dateRange, setDateRange] = useState<string>("all");
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [taxStatus, setTaxStatus] = useState<string>("all");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // Add to recent searches if not already there
    if (!recentSearches.includes(searchTerm) && searchTerm.length > 0) {
      setRecentSearches(prev => [searchTerm, ...prev].slice(0, 5));
    }
    
    console.log(`Searching for ${searchTerm} in ${selectedCategory} with filters:`, {
      dateRange,
      fileTypes,
      taxStatus
    });
    
    setIsExpanded(false);
  };

  const handleCategorySelect = (category: SearchCategory) => {
    setSelectedCategory(category);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchTerm(search);
    setIsExpanded(false);
    // Simulate a search
    console.log(`Searching for recent query: ${search} in ${selectedCategory}`);
  };

  const toggleFileType = (type: string) => {
    setFileTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  return (
    <div ref={searchRef} className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search files, clients, documents..."
            className="pl-10 pr-24 h-10 shadow-sm glass focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
          <div className="absolute right-3 flex items-center gap-1">
            {searchTerm && (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
              <PopoverTrigger asChild>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 relative"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {(fileTypes.length > 0 || dateRange !== "all" || taxStatus !== "all") && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium">Advanced Filters</h4>
                  
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>File Types</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["PDF", "Excel", "Word", "Images"].map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`type-${type}`} 
                            checked={fileTypes.includes(type)}
                            onCheckedChange={() => toggleFileType(type)}
                          />
                          <Label htmlFor={`type-${type}`}>{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tax Status</Label>
                    <Select value={taxStatus} onValueChange={setTaxStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="almost-ready">Almost Ready</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setFileTypes([]);
                        setDateRange("all");
                        setTaxStatus("all");
                      }}
                    >
                      Reset
                    </Button>
                    <Button 
                      type="button" 
                      size="sm"
                      onClick={() => setFiltersOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {isExpanded && (
          <div className="absolute z-50 mt-2 w-full glass rounded-lg shadow-lg border border-border p-4 animate-fade-in">
            <div className="mb-4">
              <p className="text-xs font-medium mb-2">CATEGORIES</p>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedCategory === "all" ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleCategorySelect("all")}
                >
                  All
                </Badge>
                {(Object.keys(categoryIcons) as SearchCategory[]).map((category) => (
                  <Badge 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"} 
                    className={cn(
                      "cursor-pointer flex items-center gap-1",
                      selectedCategory === category ? "bg-primary" : ""
                    )}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {categoryIcons[category as keyof typeof categoryIcons]}
                    <span className="capitalize">{category}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {recentSearches.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium mb-2">RECENT SEARCHES</p>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between px-2 py-1 hover:bg-accent rounded cursor-pointer"
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                        <p className="text-sm">{search}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 opacity-0 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecentSearches(prev => prev.filter(s => s !== search));
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(fileTypes.length > 0 || dateRange !== "all" || taxStatus !== "all") && (
              <div className="mb-4">
                <p className="text-xs font-medium mb-2">ACTIVE FILTERS</p>
                <div className="flex flex-wrap gap-2">
                  {dateRange !== "all" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {dateRange === "week" ? "This Week" : 
                       dateRange === "month" ? "This Month" :
                       dateRange === "quarter" ? "This Quarter" :
                       dateRange === "year" ? "This Year" : "Today"}
                    </Badge>
                  )}
                  
                  {fileTypes.map(type => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {type}
                    </Badge>
                  ))}
                  
                  {taxStatus !== "all" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Filter className="h-3 w-3" />
                      {taxStatus === "not-started" ? "Not Started" :
                       taxStatus === "processing" ? "Processing" :
                       taxStatus === "almost-ready" ? "Almost Ready" : "Completed"}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full">Search</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;

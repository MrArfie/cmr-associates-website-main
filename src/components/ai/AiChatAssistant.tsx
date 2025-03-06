
import { useState, useRef, useEffect } from "react";
import { User, Bot, Send, X, PlusCircle, ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const predefinedPrompts = [
  "Help me categorize these tax documents",
  "Explain the difference between Schedule C and Schedule E",
  "What's the deadline for filing 1099 forms?",
  "How can I optimize tax deductions for my client?",
  "Generate a monthly financial report template"
];

const AiChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: "Hello! I'm your accounting assistant. How can I help you today with tax filing, bookkeeping, or client management?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: generateUniqueId(),
      content: input,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);
    
    try {
      // Simulate API call to GPT
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate response based on user input
      let responseContent = "";
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes("tax") && lowercaseInput.includes("deadline")) {
        responseContent = "For most individual tax returns, the deadline is April 15th. However, if this falls on a weekend or holiday, it may be extended to the next business day. For businesses, deadlines vary based on the business structure and fiscal year.";
      } else if (lowercaseInput.includes("quickbooks") || lowercaseInput.includes("integration")) {
        responseContent = "Our system integrates seamlessly with QuickBooks. You can synchronize client data, financial records, and tax documents through the Integrations panel. Would you like me to guide you through the setup process?";
      } else if (lowercaseInput.includes("categorize") || lowercaseInput.includes("organize")) {
        responseContent = "To categorize documents, I recommend using our file tagging system. You can bulk select files and apply tags like 'Tax Return', 'Receipt', or 'Financial Statement'. This will make them easier to search and filter later.";
      } else if (lowercaseInput.includes("report") || lowercaseInput.includes("financial statement")) {
        responseContent = "I can help generate financial reports. We have templates for balance sheets, income statements, cash flow statements, and tax summaries. Would you like me to prepare a specific type of report?";
      } else {
        responseContent = "I understand you're asking about \"" + input + "\". To provide you with the most accurate information, could you provide more details about your specific accounting or tax question?";
      }
      
      const assistantMessage: Message = {
        id: generateUniqueId(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error("Failed to process your request. Please try again.");
      console.error("Error processing AI message:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-message-new",
        content: "Chat cleared. How else can I assist you today?",
        role: "assistant",
        timestamp: new Date()
      }
    ]);
    toast.success("Chat history cleared");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] rounded-lg glass border border-border">
      <div className="flex justify-between items-center p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">CMR AI Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={clearChat} title="Clear chat history">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div 
                className={`flex gap-3 max-w-[80%] ${
                  message.role === "assistant" 
                    ? "bg-secondary/30 text-foreground" 
                    : "bg-primary text-primary-foreground"
                } p-3 rounded-lg`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/logo.png" alt="AI Assistant" />
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col">
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <span className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user?.name} />
                    <AvatarFallback className="bg-foreground text-background">{user?.avatarInitials}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-secondary/30 text-foreground p-3 rounded-lg flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                </Avatar>
                <div className="flex space-x-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.15s" }}>•</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>•</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-2 border-t border-border">
        <div className="flex flex-wrap gap-2 mb-2">
          {predefinedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleQuickPrompt(prompt)}
              className="px-3 py-1 text-xs bg-secondary/50 hover:bg-secondary rounded-full transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1"
            disabled={isProcessing}
          />
          <Button type="submit" disabled={isProcessing || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AiChatAssistant;

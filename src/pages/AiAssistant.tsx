
import AiChatAssistant from "@/components/ai/AiChatAssistant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Brain, BrainCircuit, FileDigit, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const AiAssistant = () => {
  return (
    <div className="min-h-screen flex w-full bg-gradient-to-b from-background to-background/80">
      <div className="flex-1 flex flex-col ml-[240px]">
        <main className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <div className="mb-2">
              <h1 className="text-3xl font-bold">AI Assistant</h1>
              <p className="text-muted-foreground">Get intelligent assistance for your accounting tasks</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AiChatAssistant />
            </div>
            
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    AI Capabilities
                  </CardTitle>
                  <CardDescription>
                    What our AI assistant can help you with
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Document Analysis</p>
                        <p className="text-sm text-muted-foreground">Extract data from tax documents and receipts</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <FileDigit className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Tax Calculations</p>
                        <p className="text-sm text-muted-foreground">Get accurate tax estimates and deduction suggestions</p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <Brain className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Accounting Assistance</p>
                        <p className="text-sm text-muted-foreground">Generate reports and insights from financial data</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Try These</CardTitle>
                  <CardDescription>
                    Sample tasks to get started with the AI assistant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="tax">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tax">Tax</TabsTrigger>
                      <TabsTrigger value="bookkeeping">Bookkeeping</TabsTrigger>
                      <TabsTrigger value="clients">Clients</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tax" className="mt-4 space-y-2">
                      <Button variant="outline" className="w-full justify-between text-muted-foreground hover:text-foreground">
                        Explain tax deduction strategies
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between text-muted-foreground hover:text-foreground">
                        Calculate estimated quarterly taxes 
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TabsContent>
                    <TabsContent value="bookkeeping" className="mt-4 space-y-2">
                      <Button variant="outline" className="w-full justify-between text-muted-foreground hover:text-foreground">
                        Generate P&L statement template
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between text-muted-foreground hover:text-foreground">
                        Reconcile bank transactions
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TabsContent>
                    <TabsContent value="clients" className="mt-4 space-y-2">
                      <Button variant="outline" className="w-full justify-between text-muted-foreground hover:text-foreground">
                        Draft client onboarding email
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between text-muted-foreground hover:text-foreground">
                        Create client financial summary
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AiAssistant;

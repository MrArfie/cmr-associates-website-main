
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: "CMR Associates",
    phone: "+1 (555) 123-4567",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    compactView: false,
    autoSave: true,
  });

  const [notifications, setNotifications] = useState({
    clientActivity: true,
    taxDeadlines: true,
    documentUpdates: true,
    systemNotifications: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleToggleChange = (setting: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [setting]: !preferences[setting],
    });
    toast.success(`${setting} has been ${preferences[setting] ? 'disabled' : 'enabled'}`);
  };

  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [setting]: !notifications[setting],
    });
    toast.success(`${setting} notifications ${notifications[setting] ? 'disabled' : 'enabled'}`);
  };

  const saveProfileSettings = () => {
    toast.success("Profile information saved successfully");
  };

  const updatePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (!formData.currentPassword) {
      toast.error("Current password is required");
      return;
    }
    toast.success("Password updated successfully");
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const setupTwoFactor = () => {
    toast.success("Two-factor authentication setup initiated");
  };

  const disconnectService = (service: string) => {
    toast.success(`${service} has been disconnected`);
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-b from-background to-background/80">
      <div className="flex-1 flex flex-col ml-[240px]">
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and application preferences</p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="glass mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="animate-fade-in space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input 
                        id="company" 
                        value={formData.company} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <Button onClick={saveProfileSettings}>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize how the application works</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">Enable dark mode for the application</p>
                    </div>
                    <Switch 
                      checked={preferences.darkMode} 
                      onCheckedChange={() => handleToggleChange('darkMode')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Compact View</h4>
                      <p className="text-sm text-muted-foreground">Display more content with less spacing</p>
                    </div>
                    <Switch 
                      checked={preferences.compactView} 
                      onCheckedChange={() => handleToggleChange('compactView')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-save</h4>
                      <p className="text-sm text-muted-foreground">Automatically save changes to documents</p>
                    </div>
                    <Switch 
                      checked={preferences.autoSave} 
                      onCheckedChange={() => handleToggleChange('autoSave')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Services</CardTitle>
                  <CardDescription>Manage your connected accounts and services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-6">
                    {["Google Workspace", "QuickBooks", "Xero", "TurboTax"].map((service) => (
                      <div key={service} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <span className="font-semibold text-amber-500">{service[0]}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{service}</h4>
                            <p className="text-sm text-muted-foreground">Connected on Jun 12, 2023</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => disconnectService(service)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control when and how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      { key: 'clientActivity', title: "New client activity", desc: "When a client uploads new documents" },
                      { key: 'taxDeadlines', title: "Tax deadlines", desc: "Reminders for upcoming tax filing deadlines" },
                      { key: 'documentUpdates', title: "Document updates", desc: "When team members modify documents" },
                      { key: 'systemNotifications', title: "System notifications", desc: "Important system updates and maintenance" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch 
                          checked={notifications[item.key as keyof typeof notifications]} 
                          onCheckedChange={() => handleNotificationChange(item.key as keyof typeof notifications)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button onClick={updatePassword}>Update Password</Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" onClick={setupTwoFactor}>Setup 2FA</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;

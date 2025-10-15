import { Wifi, WifiOff, Cloud, Info } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

const Settings = () => {
  const [offlineMode, setOfflineMode] = useState(true);

  const handleOfflineToggle = (checked: boolean) => {
    setOfflineMode(checked);
    toast.success(checked ? "Offline mode enabled" : "Online mode enabled");
  };

  const handleManageSync = () => {
    toast.info("Sync settings opened");
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <header className="ocean-gradient text-white p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1 animate-fade-in">Settings</h1>
          <p className="text-white/90 text-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Configure your preferences
          </p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Mode Settings */}
        <Card className="card-shadow animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg">Mode Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {offlineMode ? (
                  <WifiOff className="text-muted-foreground" size={24} />
                ) : (
                  <Wifi className="text-primary" size={24} />
                )}
                <div>
                  <p className="font-medium">Offline Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Work without internet connection
                  </p>
                </div>
              </div>
              <Switch
                checked={offlineMode}
                onCheckedChange={handleOfflineToggle}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sync Settings */}
        <Card className="card-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Cloud className="text-secondary" size={20} />
              Sync Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleManageSync}
              variant="outline"
              className="w-full h-12 justify-start"
            >
              <Cloud className="mr-2" size={20} />
              Manage Sync Options
            </Button>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Auto-sync when online</p>
              <p>• Sync frequency: Every 30 minutes</p>
              <p>• Last sync: Oct 15, 2025 14:30</p>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="card-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="text-accent" size={20} />
              About
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">App Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Build Number</span>
              <span className="font-medium">2025.10.15</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">AI Model</span>
              <span className="font-medium">FishNet v3.2</span>
            </div>
            <Separator />
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-center text-muted-foreground">
                FishTrack AI - Smart Catch Recognition
              </p>
              <p className="text-xs text-center text-muted-foreground mt-1">
                Powered by AI • Offline Capable
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;

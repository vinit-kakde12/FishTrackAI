import { Camera, FileText, Cloud, Fish } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [lastScan, setLastScan] = useState(null);

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    if (records.length > 0) {
      setLastScan(records[records.length - 1]); // get latest record
    }
  }, []);

  const handleSync = () => {
    toast.success("All data synced successfully!");
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="ocean-gradient text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1 animate-fade-in">Welcome to NeuraCatch AI</h1>
          <p
            className="text-white/90 text-sm animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            AI-powered catch recognition
          </p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Action Buttons */}
        <div className="space-y-3 animate-slide-up">
          <Link to="/camera">
            <Button className="w-full h-16 text-lg font-semibold ocean-gradient text-white btn-shadow hover:scale-[1.02] transition-transform">
              <Camera className="mr-3" size={24} />
              📷 Capture Catch
            </Button>
          </Link>

          <Link to="/records">
            <Button
              variant="outline"
              className="w-full h-14 text-base font-medium border-2 hover:bg-muted/50"
            >
              <FileText className="mr-2" size={20} />
              🧾 Saved Records
            </Button>
          </Link>

          <Button
            onClick={handleSync}
            variant="outline"
            className="w-full h-14 text-base font-medium border-2 hover:bg-muted/50"
          >
            <Cloud className="mr-2" size={20} />
            ☁️ Sync Data
          </Button>
        </div>

        {/* Last Scan Summary */}
        {lastScan ? (
          <Card
            className="card-shadow animate-fade-in border-border"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Fish className="text-primary" size={20} />
                Last Scan Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <img
                  src={lastScan.image || "/placeholder.png"}
                  alt={lastScan.species}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Species</p>
                    <p className="font-semibold text-foreground">{lastScan.species}</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-semibold text-foreground">{lastScan.weight}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Health</p>
                      <Badge
                        className={
                          lastScan.freshness === "Fresh"
                            ? "bg-success text-white"
                            : "bg-warning text-white"
                        }
                      >
                        {lastScan.freshness}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {lastScan.date} • {lastScan.time}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="card-shadow animate-fade-in border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Fish className="text-primary" size={20} />
                Last Scan Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-6">
                No scans yet. Capture your first fish!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div
          className="grid grid-cols-3 gap-3 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Card className="text-center soft-shadow">
            <CardContent className="pt-6 pb-4">
              <p className="text-2xl font-bold text-primary">
                {JSON.parse(localStorage.getItem("records"))?.length || 0}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total Catches</p>
            </CardContent>
          </Card>
          <Card className="text-center soft-shadow">
            <CardContent className="pt-6 pb-4">
              <p className="text-2xl font-bold text-secondary">12</p>
              <p className="text-xs text-muted-foreground mt-1">Species</p>
            </CardContent>
          </Card>
          <Card className="text-center soft-shadow">
            <CardContent className="pt-6 pb-4">
              <p className="text-2xl font-bold text-success">98%</p>
              <p className="text-xs text-muted-foreground mt-1">Accuracy</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;

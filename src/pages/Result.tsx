import { Save, RotateCcw, TrendingUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const capturedImage = location.state?.image;

  // Dummy analysis results (you can later plug your AI model output here)
  const analysisResult = {
    species: "Yellowfin Tuna",
    scientificName: "Thunnus albacares",
    weight: "2.3 kg",
    count: 1,
    confidence: 96,
    freshness: "Fresh",
  };

  // Save record to localStorage
  const handleSave = () => {
    const newRecord = {
      id: Date.now(),
      species: analysisResult.species,
      weight: analysisResult.weight,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      location: "Unknown", // can be updated with GPS later
      freshness: analysisResult.freshness,
      image: capturedImage || "/placeholder.png",
    };

    const existing = JSON.parse(localStorage.getItem("records")) || [];
    existing.push(newRecord);
    localStorage.setItem("records", JSON.stringify(existing));

    toast.success("Result saved successfully!");
    setTimeout(() => navigate("/records"), 1000);
  };

  const handleRetake = () => {
    navigate("/camera");
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <header className="ocean-gradient text-white p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1 animate-fade-in">Analysis Results</h1>
          <p className="text-white/90 text-sm animate-fade-in">
            AI-powered identification complete
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Image Card */}
        <Card className="card-shadow animate-scale-in">
          <CardContent className="p-4">
            <img
              src={capturedImage || "/placeholder.png"}
              alt="Captured Fish"
              className="w-full h-56 object-cover rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Main Result Card */}
        <Card className="card-shadow animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Species Identified</span>
              <Badge
                className={
                  analysisResult.freshness === "Fresh"
                    ? "bg-success text-white"
                    : "bg-warning text-white"
                }
              >
                {analysisResult.freshness}
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Species Name</p>
              <p className="text-2xl font-bold text-primary">{analysisResult.species}</p>
              <p className="text-sm text-muted-foreground italic">
                {analysisResult.scientificName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Weight</p>
                <p className="text-xl font-semibold">{analysisResult.weight}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Fish Count</p>
                <p className="text-xl font-semibold">{analysisResult.count}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confidence Metrics */}
        <Card className="card-shadow animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="text-secondary" size={20} />
              Analysis Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Confidence</span>
                <span className="text-sm font-bold text-primary">
                  {analysisResult.confidence}%
                </span>
              </div>
              <Progress value={analysisResult.confidence} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 animate-fade-in">
          <Button
            onClick={handleRetake}
            variant="outline"
            className="flex-1 h-14 border-2"
          >
            <RotateCcw className="mr-2" size={20} />
            Retake
          </Button>

          <Button
            onClick={handleSave}
            className="flex-1 h-14 ocean-gradient text-white btn-shadow"
          >
            <Save className="mr-2" size={20} />
            Save Result
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Result;

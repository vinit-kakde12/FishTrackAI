import { useEffect, useState } from "react";
import { Search, Cloud, Fish, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import tunaSample from "@/assets/tuna-sample.png";
import { toast } from "sonner";

const Records = () => {
  const [records, setRecords] = useState([]);

  // Predefined demo records
  const demoRecords = [
    // {
    //   id: 1,
    //   species: "Yellowfin Tuna",
    //   weight: "2.3 kg",
    //   date: "Oct 15, 2025",
    //   time: "14:30",
    //   location: "Pacific Ocean",
    //   freshness: "Fresh",
    //   image: tunaSample,
    // },
    // {
    //   id: 2,
    //   species: "Atlantic Salmon",
    //   weight: "3.1 kg",
    //   date: "Oct 14, 2025",
    //   time: "09:15",
    //   location: "North Atlantic",
    //   freshness: "Fresh",
    //   image: tunaSample,
    // },
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("records")) || [];
    setRecords([...demoRecords, ...saved]);
  }, []);

  const handleSync = () => {
    toast.success("All records synced successfully!");
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <header className="ocean-gradient text-white p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1 animate-fade-in">Saved Records</h1>
          <p className="text-white/90 text-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {records.length} catches recorded
          </p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Search Bar */}
        <div className="relative animate-slide-up">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input placeholder="Search by species, date, or location..." className="pl-10 h-12 bg-card" />
        </div>

        {/* Records List */}
        <div className="space-y-3">
          {records.map((record, index) => (
            <Card
              key={record.id}
              className="card-shadow hover:shadow-lg transition-shadow cursor-pointer animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={record.image}
                    alt={record.species}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          <Fish size={16} className="text-primary" />
                          {record.species}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground">
                          {record.weight}
                        </p>
                      </div>
                      <Badge
                        className={
                          record.freshness === "Fresh"
                            ? "bg-success text-white"
                            : "bg-warning/80 text-white"
                        }
                      >
                        {record.freshness}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {record.date} {record.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {record.location}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {records.length === 0 && (
            <p className="text-center text-muted-foreground text-sm mt-6">
              No records found. Capture or upload to save your first record.
            </p>
          )}
        </div>

        {/* Sync Button */}
        <Button
          onClick={handleSync}
          variant="outline"
          className="w-full h-14 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Cloud className="mr-2" size={20} />
          Sync All Records
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Records;

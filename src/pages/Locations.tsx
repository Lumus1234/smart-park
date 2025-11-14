import { MapPin, Clock, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Location {
  id: string;
  name: string;
  area: string;
  price: string;
  spots: number;
  status: "available" | "limited" | "full";
  type: "free" | "paid";
}

const Locations = () => {
  const navigate = useNavigate();

  const locations: Location[] = [
    { id: "1", name: "City Center Parking", area: "Downtown", price: "$3.5/hr", spots: 12, status: "available", type: "paid" },
    { id: "2", name: "Shopping Mall West", area: "West Side", price: "Free", spots: 45, status: "available", type: "free" },
    { id: "3", name: "Train Station", area: "East Side", price: "$2/hr", spots: 8, status: "limited", type: "paid" },
    { id: "4", name: "Park & Ride North", area: "North", price: "Free", spots: 67, status: "available", type: "free" },
    { id: "5", name: "Hospital Parking", area: "South", price: "$4/hr", spots: 0, status: "full", type: "paid" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-success";
      case "limited":
        return "text-warning";
      case "full":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success/10";
      case "limited":
        return "bg-warning/10";
      case "full":
        return "bg-destructive/10";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Available Locations</h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="flex items-center gap-1 text-xs">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-muted-foreground">Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {locations.map((location) => (
          <Card
            key={location.id}
            className="p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/location/${location.id}`)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{location.name}</h3>
                <p className="text-sm text-muted-foreground">{location.area}</p>
              </div>
              <Badge
                variant={location.type === "free" ? "secondary" : "outline"}
                className="ml-2"
              >
                {location.type === "free" ? "Free" : "Paid"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-semibold">{location.price}</span>
                  {location.type === "paid" && (
                    <Clock className="h-3 w-3 text-primary" />
                  )}
                  <span className="text-xs text-muted-foreground">Now</span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getStatusBg(location.status)}`}>
                  <span className={`text-sm font-medium ${getStatusColor(location.status)}`}>
                    {location.spots} spots
                  </span>
                </div>
              </div>
              <button className="text-primary hover:text-primary/80 transition-colors">
                <span className="text-sm mr-1">View Details</span>
                <ChevronRight className="h-4 w-4 inline" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Locations;

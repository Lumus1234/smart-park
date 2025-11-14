import { Search, MapPin, Star, Clock, Users, DollarSign, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const filters = ["All", "Free Only", "Paid Only", "Available Only"];

  const allParkingSpots = [
    { id: 1, name: "Hospital Parking", x: 20, y: 30, status: "full", type: "paid", price: "$4/hr", spots: "0/40" },
    { id: 2, name: "City Center", x: 45, y: 45, status: "available", type: "paid", price: "$3/hr", spots: "28/50" },
    { id: 3, name: "Mall Plaza", x: 65, y: 25, status: "limited", type: "paid", price: "$2.5/hr", spots: "8/60" },
    { id: 4, name: "Park & Ride", x: 80, y: 60, status: "available", type: "free", price: "Free", spots: "45/80" },
    { id: 5, name: "Beach Area", x: 30, y: 70, status: "available", type: "free", price: "Free", spots: "22/30" },
    { id: 6, name: "Stadium North", x: 55, y: 80, status: "limited", type: "paid", price: "$5/hr", spots: "5/45" },
    { id: 7, name: "Library", x: 75, y: 40, status: "available", type: "free", price: "Free", spots: "18/25" },
    { id: 8, name: "Train Station", x: 40, y: 55, status: "full", type: "paid", price: "$4.5/hr", spots: "0/70" },
  ];

  const filteredSpots = allParkingSpots.filter(spot => {
    if (activeFilter === "Free Only") return spot.type === "free";
    if (activeFilter === "Paid Only") return spot.type === "paid";
    if (activeFilter === "Available Only") return spot.status === "available";
    return true;
  });

  const stats = [
    { label: "Total Available", value: "329", subtext: "of 695 spots", icon: Users, color: "text-primary" },
    { label: "Free Parking", value: "132", subtext: "spots available", icon: DollarSign, color: "text-success" },
    { label: "Paid Parking", value: "197", subtext: "spots available", icon: Clock, color: "text-warning" },
    { label: "Locations", value: "10", subtext: "parking areas", icon: MapPin, color: "text-purple-500" },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Greeting Card */}
      <Card className="bg-primary text-primary-foreground p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">Good afternoon ☀️</span>
            </div>
            <h2 className="text-2xl font-bold">Alex</h2>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Current Time</p>
            <p className="text-xl font-bold">{currentTime}</p>
          </div>
        </div>
      </Card>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search parking locations..."
          className="pl-10 pr-20 h-12 rounded-xl bg-card"
        />
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
        >
          <MapPin className="h-4 w-4 mr-1" />
          Nearby
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card hover:bg-accent transition-colors">
          <Star className="h-5 w-5 text-warning fill-warning" />
          <span className="text-xs font-medium">Favorites</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card hover:bg-accent transition-colors">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-xs font-medium">Recent</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card hover:bg-accent transition-colors">
          <MapPin className="h-5 w-5 text-success" />
          <span className="text-xs font-medium">Nearby</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card hover:bg-accent transition-colors">
          <Clock className="h-5 w-5 text-purple-500" />
          <span className="text-xs font-medium">Reserve</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.subtext}</p>
          </Card>
        ))}
      </div>

      {/* Filter Pills */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter by:
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="rounded-full whitespace-nowrap"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <Card className="h-80 rounded-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-accent to-muted/50">
          {/* Map Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-foreground/20" />
              ))}
            </div>
          </div>
          
          {/* Parking Markers */}
          {filteredSpots.map(spot => (
            <div
              key={spot.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <div className="relative">
                {/* Pulse animation for available spots */}
                {spot.status === "available" && (
                  <div className="absolute inset-0 rounded-full bg-success opacity-75 animate-ping" />
                )}
                {/* Marker */}
                <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                  spot.status === "available" ? "bg-success" :
                  spot.status === "limited" ? "bg-warning" :
                  "bg-destructive"
                }`}>
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-card border border-border rounded-lg p-2 shadow-xl whitespace-nowrap">
                    <p className="text-xs font-semibold">{spot.name}</p>
                    <p className="text-xs text-muted-foreground">{spot.spots} • {spot.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-warning" />
                <span>Limited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span>Full</span>
              </div>
            </div>
          </div>

          {/* My Location Button */}
          <button className="absolute top-4 right-4 bg-card rounded-lg p-2 shadow-lg hover:bg-accent transition-colors">
            <Navigation className="h-5 w-5 text-primary" />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Home;

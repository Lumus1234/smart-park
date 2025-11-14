import { Search, MapPin, Star, Clock, Users, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const filters = ["All", "Free Only", "Paid Only", "Available Only"];

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
      <Card className="h-64 rounded-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-accent flex items-center justify-center">
          <div className="text-center space-y-3">
            <MapPin className="h-12 w-12 text-primary mx-auto" />
            <div>
              <p className="text-sm font-medium">Interactive Map</p>
              <p className="text-xs text-muted-foreground">Parking locations nearby</p>
            </div>
            <div className="flex gap-4 justify-center text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-success" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-warning" />
                <span>Limited</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span>Full</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;

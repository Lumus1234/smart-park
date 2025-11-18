import { Search, MapPin, Star, Clock, Users, DollarSign, Navigation, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const filters = ["All", "Free Only", "Paid Only", "Available Only"];

  // Calculate status based on spot availability
  const calculateStatus = (spotsStr: string): "available" | "limited" | "full" => {
    const [available, total] = spotsStr.split('/').map(Number);
    const taken = total - available;
    const percentageTaken = (taken / total) * 100;
    
    console.log(`Parking: ${spotsStr} | Taken: ${taken}/${total} (${percentageTaken.toFixed(1)}%)`);
    
    if (available === 0) {
      console.log(`  -> Status: FULL (100% taken)`);
      return "full";
    }
    
    if (percentageTaken >= 70) {
      console.log(`  -> Status: LIMITED (>=70% taken)`);
      return "limited";
    }
    
    console.log(`  -> Status: AVAILABLE (<70% taken)`);
    return "available";
  };

  const allParkingSpots = [
    { 
      id: 1, 
      name: "Hospital Parking", 
      area: "South",
      x: 20, 
      y: 30, 
      type: "paid", 
      price: "$4/hr", 
      spots: "0/40",
      schedule: [
        { days: "Mon - Sun", time: "All Day", rate: "$4/hr" },
      ]
    },
    { 
      id: 2, 
      name: "City Center", 
      area: "Downtown",
      x: 45, 
      y: 45, 
      type: "paid", 
      price: "$3/hr", 
      spots: "28/50",
      schedule: [
        { days: "Mon - Fri", time: "7:00 AM - 6:00 PM", rate: "$3/hr" },
        { days: "Mon - Fri", time: "6:00 PM - 11:59 PM", rate: "$1.5/hr" },
        { days: "Sat, Sun", time: "All Day", rate: "$2/hr" },
      ]
    },
    { 
      id: 3, 
      name: "Mall Plaza", 
      area: "West",
      x: 65, 
      y: 25, 
      type: "paid", 
      price: "$2.5/hr", 
      spots: "8/60",
      freeIn: "1h 45m",
      schedule: [
        { days: "Mon - Fri", time: "9:00 AM - 9:00 PM", rate: "$2.5/hr" },
        { days: "Sat, Sun", time: "9:00 AM - 9:00 PM", rate: "$3/hr" },
      ]
    },
    { 
      id: 4, 
      name: "Park & Ride", 
      area: "North",
      x: 80, 
      y: 60, 
      type: "free", 
      price: "Free", 
      spots: "45/80",
      schedule: [
        { days: "Mon - Sun", time: "All Day", rate: "Free" },
      ]
    },
    { 
      id: 5, 
      name: "Beach Area", 
      area: "Waterfront",
      x: 30, 
      y: 70, 
      type: "free", 
      price: "Free", 
      spots: "22/30",
      schedule: [
        { days: "Mon - Sun", time: "All Day", rate: "Free" },
      ]
    },
    { 
      id: 6, 
      name: "Stadium North", 
      area: "Sports District",
      x: 55, 
      y: 80, 
      type: "paid", 
      price: "$5/hr", 
      spots: "5/45",
      schedule: [
        { days: "Mon - Fri", time: "All Day", rate: "$3/hr" },
        { days: "Sat, Sun", time: "All Day", rate: "$5/hr" },
      ]
    },
    { 
      id: 7, 
      name: "Library Street", 
      area: "Downtown",
      x: 75, 
      y: 40, 
      type: "free", 
      price: "Free", 
      spots: "18/25",
      schedule: [
        { days: "Mon - Sun", time: "All Day", rate: "Free" },
      ]
    },
    { 
      id: 8, 
      name: "University Campus", 
      area: "University",
      x: 40, 
      y: 55, 
      type: "paid", 
      price: "$2/hr", 
      spots: "5/35",
      freeIn: "2h 36m",
      schedule: [
        { days: "Sun, Sat", time: "5:00 AM - 11:59 PM", rate: "Free" },
        { days: "Mon, Tue, Wed, Thu, Fri", time: "7:00 AM - 5:00 PM", rate: "$2/hr" },
        { days: "Mon, Tue, Wed, Thu, Fri", time: "5:00 PM - 11:59 PM", rate: "Free" },
      ]
    },
  ].map(spot => ({
    ...spot,
    status: calculateStatus(spot.spots)
  }));

  const filteredSpots = allParkingSpots.filter(spot => {
    if (activeFilter === "Free Only") return spot.type === "free";
    if (activeFilter === "Paid Only") return spot.type === "paid";
    if (activeFilter === "Available Only") return spot.status === "available";
    return true;
  });

  const handleMonitorLocation = () => {
    if (selectedSpot) {
      toast({
        title: "Location monitored",
        description: `You will be notified when ${selectedSpot.name} has available spots`,
      });
      setSelectedSpot(null);
    }
  };

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
      <div className="grid grid-cols-3 gap-3">
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card hover:bg-accent transition-colors">
          <Star className="h-5 w-5 text-warning fill-warning" />
          <span className="text-xs font-medium">Favorites</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card hover:bg-accent transition-colors">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-xs font-medium">Recent</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card hover:bg-accent transition-colors">
          <Navigation className="h-5 w-5 text-success" />
          <span className="text-xs font-medium">Navigate</span>
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
              onClick={() => setSelectedSpot(spot)}
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

      {/* Parking Spot Dialog */}
      <Dialog open={!!selectedSpot} onOpenChange={() => setSelectedSpot(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedSpot && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-xl font-bold mb-1">
                    {selectedSpot.name}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">{selectedSpot.area}</p>
                </div>
                <Badge variant={selectedSpot.type === "free" ? "secondary" : "default"}>
                  {selectedSpot.type === "free" ? "Free" : "Paid"}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Availability</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{selectedSpot.spots} spots</span>
                    <Badge
                      variant={
                        selectedSpot.status === "available" ? "default" :
                        selectedSpot.status === "limited" ? "secondary" : "destructive"
                      }
                      className={
                        selectedSpot.status === "available" ? "bg-success text-white" :
                        selectedSpot.status === "limited" ? "bg-warning text-warning-foreground" : ""
                      }
                    >
                      {selectedSpot.status === "available" ? "Good Availability" :
                       selectedSpot.status === "limited" ? "Limited Spaces" : "Full"}
                    </Badge>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        selectedSpot.status === "available" ? "bg-success" :
                        selectedSpot.status === "limited" ? "bg-warning" : "bg-destructive"
                      }`}
                      style={{
                        width: `${
                          selectedSpot.status === "available" ? "75%" :
                          selectedSpot.status === "limited" ? "25%" : "5%"
                        }`
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-y border-border">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Parking Rate</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{selectedSpot.price}</p>
                    {selectedSpot.freeIn && (
                      <p className="text-xs text-success flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        Free in {selectedSpot.freeIn}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Current Status</span>
                  </div>
                  <span className={
                    selectedSpot.status === "available" ? "text-success font-semibold" :
                    selectedSpot.status === "limited" ? "text-warning font-semibold" : 
                    "text-destructive font-semibold"
                  }>
                    {selectedSpot.status === "available" ? "Good Availability" :
                     selectedSpot.status === "limited" ? "Limited Spaces" : "Full"}
                  </span>
                </div>

                {selectedSpot.schedule && selectedSpot.schedule.length > 1 && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Pricing Schedule</span>
                    </div>
                    <div className="space-y-2">
                      {selectedSpot.schedule.map((schedule: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`h-2 w-2 rounded-full ${schedule.rate === "Free" ? "bg-success" : "bg-primary"}`} />
                              <span className="font-medium">{schedule.days}</span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-4">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {schedule.time}
                            </p>
                          </div>
                          <span className={`font-semibold ${schedule.rate === "Free" ? "text-success" : ""}`}>
                            {schedule.rate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <Button className="w-full h-12 rounded-xl">
                  <Navigation className="h-5 w-5 mr-2" />
                  Get Directions
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12 rounded-xl"
                  onClick={handleMonitorLocation}
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Monitor Location
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;

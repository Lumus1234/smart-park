import { Edit, MapPin, Clock, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const stats = [
    { label: "Total Sessions", value: "127", icon: MapPin, color: "text-primary", bgColor: "bg-primary/10" },
    { label: "Hours Parked", value: "342h", icon: Clock, color: "text-success", bgColor: "bg-success/10" },
    { label: "Total Spent", value: "$456.5", icon: DollarSign, color: "text-warning", bgColor: "bg-warning/10" },
    { label: "Avg Duration", value: "2.7h", icon: TrendingUp, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  ];

  const commonPlaces = [
    { name: "City Center Parking", lastVisit: "10/20/2024", visits: 45 },
    { name: "Train Station", lastVisit: "10/18/2024", visits: 32 },
    { name: "Library Street", lastVisit: "10/15/2024", visits: 28 },
    { name: "Business District", lastVisit: "10/12/2024", visits: 22 },
  ];

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Profile Header */}
      <Card className="p-6 rounded-xl">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">AJ</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">Alex Johnson</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="text-xs">
              Premium Member
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>alex.johnson@email.com</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Member since 6/15/2023</span>
          </div>
        </div>
      </Card>

      {/* Parking Statistics */}
      <div>
        <h3 className="font-semibold mb-3">Parking Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 rounded-xl">
              <div className={`${stat.bgColor} p-2 rounded-lg inline-block mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Common Parking Places */}
      <div>
        <h3 className="font-semibold mb-3">Common Parking Places</h3>
        <Card className="rounded-xl divide-y divide-border">
          {commonPlaces.map((place, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{place.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Last visit: {place.lastVisit}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-primary">
                {place.visits} visits
              </span>
            </div>
          ))}
        </Card>
      </div>

      {/* Parking History Button */}
      <Button variant="outline" className="w-full h-12 rounded-xl">
        <Calendar className="h-5 w-5 mr-2" />
        Parking History
      </Button>
    </div>
  );
};

export default Profile;

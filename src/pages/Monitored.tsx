import { Bell, MapPin, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Monitored = () => {
  const monitoredLocations = [
    {
      id: "1",
      name: "Hospital Parking",
      area: "South",
      spots: "0/40 spots",
      price: "$4/hr",
      status: "full",
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Monitored Locations</h2>
        <p className="text-sm text-muted-foreground">
          Get notifications when parking spots become available
        </p>
      </div>

      <Card className="p-4 rounded-xl bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 text-sm">
            <p className="font-medium mb-1">You'll receive notifications when monitored spots have available spaces</p>
            <p className="text-xs text-muted-foreground">
              Toggle notifications on/off for each location below
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {monitoredLocations.map((location) => (
          <Card key={location.id} className="p-4 rounded-xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{location.name}</h3>
                    <Badge variant="destructive">Full</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{location.area}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="text-destructive font-medium">{location.spots}</span>
                    <span className="text-muted-foreground">{location.price}</span>
                  </div>
                </div>
              </div>
              <button className="text-destructive hover:text-destructive/80 transition-colors p-2">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Bell className="h-4 w-4 text-primary" />
                <span className="font-medium">Notifications On</span>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        ))}
      </div>

      {monitoredLocations.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No monitored locations yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Monitor locations to get notified when spots become available
          </p>
        </div>
      )}
    </div>
  );
};

export default Monitored;

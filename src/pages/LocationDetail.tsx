import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation, Bell, Calendar, Clock, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pricingSchedule = [
    { days: "Sun, Sat", time: "12:00 AM - 11:59 PM", price: "Free", color: "success" },
    { days: "Mon, Tue, Wed, Thu, Fri", time: "6:00 PM - 11:59 PM", price: "Free", color: "success" },
    { days: "Mon, Tue, Wed, Thu, Fri", time: "8:00 AM - 6:00 PM", price: "$3.5/hr", color: "warning" },
  ];

  return (
    <div className="pb-6">
      <div className="bg-card p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">City Center Parking</h1>
        </div>
        <p className="text-sm text-muted-foreground ml-11">Downtown</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Availability */}
        <Card className="p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Availability</h3>
            <span className="text-sm font-medium">12/50 spots</span>
          </div>
          <Progress value={24} className="h-2" />
        </Card>

        {/* Parking Rate */}
        <Card className="p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="bg-warning/10 p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-warning" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Parking Rate</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$3.5/hour</span>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Now
                </Badge>
              </div>
              <p className="text-xs text-success mt-2">⏰ Free in 4h 7m</p>
            </div>
          </div>
        </Card>

        {/* Current Status */}
        <Card className="p-4 rounded-xl bg-success/5 border-success/20">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-success rounded-full" />
            <div>
              <h3 className="font-semibold text-success">Current Status</h3>
              <p className="text-sm text-success/80">Good Availability</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full h-12 rounded-xl" size="lg">
            <Navigation className="h-5 w-5 mr-2" />
            Get Directions
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-xl" size="lg">
            <Bell className="h-5 w-5 mr-2" />
            Monitor Location
          </Button>
        </div>

        {/* Pricing Schedule */}
        <Card className="p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Pricing Schedule</h3>
          </div>

          <div className="space-y-3">
            {pricingSchedule.map((schedule, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`h-2 w-2 rounded-full mt-1.5 ${
                  schedule.color === "success" ? "bg-success" : "bg-warning"
                }`} />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">{schedule.days}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{schedule.time}</span>
                  </div>
                </div>
                <span className={`font-semibold text-sm ${
                  schedule.color === "success" ? "text-success" : "text-warning"
                }`}>
                  {schedule.price}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LocationDetail;

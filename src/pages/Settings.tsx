import { Moon, Bell, MapPin, RefreshCw, ChevronRight, Shield, Info, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const settingsSections = [
    {
      title: "Appearance",
      items: [
        {
          icon: Moon,
          label: "Dark Mode",
          description: "Switch between light and dark theme",
          hasSwitch: true,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: Bell,
          label: "Push Notifications",
          description: "Get alerts about parking availability",
          hasSwitch: true,
        },
      ],
    },
    {
      title: "Location & Map",
      items: [
        {
          icon: MapPin,
          label: "Location Services",
          description: "Find nearby parking spots",
          hasSwitch: true,
          defaultChecked: true,
        },
        {
          icon: RefreshCw,
          label: "Auto-refresh Map",
          description: "Update availability in real-time",
          hasSwitch: true,
          defaultChecked: true,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: Shield,
          label: "Privacy & Security",
          hasArrow: true,
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          icon: Info,
          label: "About SmartPark",
          hasArrow: true,
        },
      ],
    },
  ];

  return (
    <div className="p-4 space-y-6 pb-6">
      <h2 className="text-xl font-bold">Settings</h2>

      {settingsSections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            {section.title}
          </h3>
          <Card className="rounded-xl overflow-hidden divide-y divide-border">
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="bg-accent p-2 rounded-lg">
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.hasSwitch && (
                  <Switch defaultChecked={item.defaultChecked} />
                )}
                {item.hasArrow && (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </Card>
        </div>
      ))}

      <Card className="p-4 rounded-xl bg-muted/50">
        <div className="flex items-start gap-3 mb-3">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-sm mb-1">Version 1.0.0</p>
            <p className="text-xs text-muted-foreground">
              SmartPark helps you find and monitor parking spaces in real-time. Never miss an available spot again!
            </p>
          </div>
        </div>
      </Card>

      <Button
        variant="outline"
        className="w-full h-12 rounded-xl text-destructive border-destructive/20 hover:bg-destructive/10"
      >
        <LogOut className="h-5 w-5 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default Settings;

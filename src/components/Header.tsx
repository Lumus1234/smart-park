import { MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-2">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">SmartPark</h1>
            <p className="text-xs text-muted-foreground">Find. Park. Easy.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs font-medium text-success">Live Updates</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="max-w-md mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;

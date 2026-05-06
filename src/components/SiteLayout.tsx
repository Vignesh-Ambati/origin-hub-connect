import { ReactNode } from "react";
import ConstellationBackground from "@/components/ConstellationBackground";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col">
      <ConstellationBackground />
      <SiteHeader />
      <main className="relative z-10 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;

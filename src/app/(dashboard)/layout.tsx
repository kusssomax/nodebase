import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
        <AppSidebar />
      <SidebarInset className="bg-accent/20">
        {children}
        </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;

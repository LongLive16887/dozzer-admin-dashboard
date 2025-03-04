import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader } from "@/widgets";
import { RadarChart } from "recharts";

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader 
        isInDashboardPage = {true}
        breadcrumbItemName="Dashboard"
        hasLangSelector={false}
        /* actionButton={<CreateCategory/>} */
        />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage
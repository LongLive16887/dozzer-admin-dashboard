import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader } from "@/widgets";
import { Component } from "./chart";
import {Location} from "./Location"

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
        <div className="gap-4 w-[400px] h-[400px] m-4 ">
        <Component/>
        <div className="m-4">
        <Location/>
        </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage
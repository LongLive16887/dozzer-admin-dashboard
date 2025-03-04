import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader } from "@/widgets";
import { Component } from "./chart";

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
        <div className="">
        <Component/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage
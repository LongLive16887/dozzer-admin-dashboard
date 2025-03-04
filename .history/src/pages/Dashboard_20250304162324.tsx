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
        <div className="flex gap-4 w-[900px] h-[400px] p-4 m-4">
        <Component/>
        <Component/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage
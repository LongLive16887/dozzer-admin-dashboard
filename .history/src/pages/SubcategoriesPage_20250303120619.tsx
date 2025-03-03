import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader } from "@/widgets";


export const SubcategoriesPage = () => {
    return (
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader 
        isInDashboardPage = {false}
        breadcrumbItemName="Sub Categories"
        hasLangSelector={false}
        actionButton={<creat/>} 
        />
      </SidebarInset>
    </SidebarProvider>
    );
  };

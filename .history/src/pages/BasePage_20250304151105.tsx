import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader } from "@/widgets";

const BasePage = () => {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader 
          isInDashboardPage = {false}
          breadcrumbItemName="Base"
          hasLangSelector={false}
          /* actionButton={<CreateCategory/>} */
          />
          
        </SidebarInset>
      </SidebarProvider>
    );
  };

export default BasePage;
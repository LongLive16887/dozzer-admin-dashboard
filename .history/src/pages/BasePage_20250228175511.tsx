import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader } from "@/widgets";

export const BasePage = () => {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader 
          isInDashboardPage = {false}
          breadcrumbItemName="Categories"
          hasLangSelector={false}
          actionButton={<CreateCategory/>}
          />
        </SidebarInset>
      </SidebarProvider>
    );
  };
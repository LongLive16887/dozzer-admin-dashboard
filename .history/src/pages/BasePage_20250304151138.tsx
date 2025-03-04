import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader,BasesList } from "@/widgets";

const BasePage = () => {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader 
          isInDashboardPage = {false}
          breadcrumbItemName="Base"
          hasLangSelector={false}
          actionButton={<CreateCategory/>}
          />
          <BasesList/>
        </SidebarInset>
      </SidebarProvider>
    );
  };

export default BasePage;
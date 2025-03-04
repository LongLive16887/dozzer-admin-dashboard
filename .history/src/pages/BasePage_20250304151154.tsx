import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader,BasesList } from "@/widgets";
import { CreateBase } from "@/features/base";

const BasePage = () => {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader 
          isInDashboardPage = {false}
          breadcrumbItemName="Base"
          hasLangSelector={false}
          actionButton={<CreateBase/>}
          />
          <BasesList/>
        </SidebarInset>
      </SidebarProvider>
    );
  };

export default BasePage;
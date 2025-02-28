import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { CategoriesList,AppSidebar,AppHeader } from "@/widgets";



export const ItemsPage = () => {
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
        <CategoriesList/>
      </SidebarInset>
    </SidebarProvider>
    );
};
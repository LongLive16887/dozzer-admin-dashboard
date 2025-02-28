import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { CategoriesList,AppSidebar,AppHeader } from "@/widgets";

export const CategoriesPage = () => {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader 
        isInDashboardPage = {false}
        breadcrumbItemName="Categories"
        hasLangSelector={true}
        actionButton={}
        />
        <CategoriesList/>
      </SidebarInset>
    </SidebarProvider>
  );
};

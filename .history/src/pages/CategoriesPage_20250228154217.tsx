import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { CategoriesList,AppSidebar,AppHeader } from "@/widgets";
import {Crea}

export const CategoriesPage = () => {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader 
        isInDashboardPage = {false}
        breadcrumbItemName="Categories"
        hasLangSelector={true}
        actionButton={Cre}
        />
        <CategoriesList/>
      </SidebarInset>
    </SidebarProvider>
  );
};

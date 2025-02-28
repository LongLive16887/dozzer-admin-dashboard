import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { CategoriesList,AppSidebar,AppHeader } from "@/widgets";
import { CreateCategory } from "@/features/categories";

export const CategoriesPage = () => {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader 
        isInDashboardPage = {false}
        breadcrumbItemName="Categories"
        hasLangSelector={true}
        actionButton={CreateCategory}
        />
        <CategoriesList/>
      </SidebarInset>
    </SidebarProvider>
  );
};

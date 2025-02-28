import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { CategoriesList,AppSidebar,AppHeader } from "@/widgets";
import { AppHeader } from "@/widgets/app-header";

export const CategoriesPage = () => {

  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
      <h1>Categories</h1>
      <AppHeader 
      isInDashboardPage = {false}
      breadcrumbItemName="Categories"
      hasLangSelector={true}
      />
      <CategoriesList/>
    </div>
    </SidebarProvider>
  );
};

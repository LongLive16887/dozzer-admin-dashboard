import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { CategoriesList,AppSidebar,AppHeader } from "@/widgets";


export const SubcategoriesPage = () => {
    return (
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader 
        isInDashboardPage = {false}
        breadcrumbItemName="Sub Categories"
        hasLangSelector={false}
        /* actionButton={<CreateCategory/>} */
        />
      </SidebarInset>
    </SidebarProvider>
    );
  };

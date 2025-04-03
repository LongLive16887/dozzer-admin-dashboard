import { CreateSubСategory } from "@/features/subcategories";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader, SubCategoriesList } from "@/widgets";


const SubcategoriesPage = () => {
    return (
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader 
        isInDashboardPage = {false}
        breadcrumbItemName="Sub Categories"
        hasLangSelector={true}
        actionButton={<CreateSubСategory/>} 
        />
        <SubCategoriesList/>
      </SidebarInset>
    </SidebarProvider>
    );
  };


export default SubcategoriesPage;
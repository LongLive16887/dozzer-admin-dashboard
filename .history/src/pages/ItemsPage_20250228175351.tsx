import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { CategoriesList,AppSidebar,AppHeader } from "@/widgets";



export const ItemsPage = () => {
    return (
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <AppHeader 
            isInDashboardPage = {false}
            breadcrumbItemName="Items"
            hasLangSelector={true}
            /* actionButton={<CreateCategory/>} */
            />
            <CategoriesList/>
        </SidebarInset>
        </SidebarProvider>
    );
};
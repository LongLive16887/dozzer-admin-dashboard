import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader } from "@/widgets";
import {Categ}

const ItemsPage = () => {
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
                
            </SidebarInset>
        </SidebarProvider>
    );
};


export default ItemsPage;
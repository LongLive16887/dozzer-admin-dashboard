import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar,AppHeader } from "@/widgets";
import {ItemsList} from "@/widgets";
import { CreateItem } from "@/features/items";

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
                <ItemsList/>
            </SidebarInset>
        </SidebarProvider>
    );
};


export default ItemsPage;
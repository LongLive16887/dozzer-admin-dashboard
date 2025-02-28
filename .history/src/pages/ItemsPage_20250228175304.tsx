
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
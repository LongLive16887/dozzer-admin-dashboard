
import { CategoriesList } from "@/widgets";
import { AppHeader } from "@/widgets/app-header";

export const CategoriesPage = () => {

  return (
    <AppRouter>
      <AppRouter/>
    <div>
      <h1>Categories</h1>
      <AppHeader 
      isInDashboardPage = {false}
      breadcrumbItemName="Categories"
      hasLangSelector={true}
      />
      <CategoriesList/>
    </div>
  );
};

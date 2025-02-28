
import { CategoriesList } from "@/widgets";
import { AppHeader } from "@/widgets/app-header";

export const CategoriesPage = () => {

  return (
    <div>
      <h1>Categories</h1>
      <AppHeader 
      isInDashboardPage 
      />
      <CategoriesList/>
    </div>
  );
};

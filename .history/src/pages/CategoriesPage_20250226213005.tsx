
import { CategoriesList } from "@/widgets";

export const CategoriesPage = () => {

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <div>
      <h1>Categories</h1>
      <CategoriesList/>
    </div>
  );
};

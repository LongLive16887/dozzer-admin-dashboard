import { useGetCategoriesQuery } from "@/shared/api/categories";

export const CategoriesPage = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <div>
      <h1>Categories</h1>
      <pre>{JSON.stringify(data.data, null, 2)}</pre>
    </div>
  );
};

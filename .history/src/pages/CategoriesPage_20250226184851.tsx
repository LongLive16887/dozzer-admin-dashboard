import { useGetCategoriesQuery } from "@/shared/api/categories";

export const CategoriesPage = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {data?.results?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

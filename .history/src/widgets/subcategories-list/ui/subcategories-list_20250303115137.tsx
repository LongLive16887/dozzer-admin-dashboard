import { useGetSubCategoriesQuery } from "@/shared/api/subcategories";

import {
  UpdateSubcategory,
  DeleteSubCategory
} from "@/features/subcategories";

import { SubCategory } from "@/entities";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";

export const CategoriesList = () => {
    const navigateTo = useNavigate();
    const { feedId } = useParams();
  const { data, isLoading, error } = useGetSubCategoriesQuery();
  const dataCategories = data;

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl bg-muted/50 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>IMG</TableHead>
                <TableHead className="text-right">NAME</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="text-center rounded-xl bg-muted/50 p-4">
          ❌ Error fetching categories. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="rounded-xl bg-muted/50 p-4">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>c_ID</TableHead>
              <TableHead>u_ID</TableHead>
              <TableHead>IMG</TableHead>
              <TableHead className="text-right">NAME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {typeof dataCategories?.data === 'object' && 'results' in dataCategories.data ? (
              dataCategories.data.results.map((subCategory) => (
              <SubCategory
                  key={subCategory.id}
                  subCategory={subCategory}
                  updateFeature={<UpdateSubcategory updateSubCategoryData={subCategory} />}
                  deleteFeature={<DeleteSubCategory deleteCategoryId={category.id} />}
              />
          ))
          ) : (
              <p>No Data</p>
          )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
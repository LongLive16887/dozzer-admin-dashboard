import { useGetCategoriesQuery } from "@/shared/api/categories";

import {
  UpdateCategory,
  DeleteCategory,
  ViewSubCategory
} from "@/features/categories";

import { Category } from "@/entities";

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
  
  const { data, isLoading, error } = useGetCategoriesQuery();
  const dataCategories = data?.data.results || [];

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl bg-muted/50 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>C_ID</TableHead>
                <TableHead>U_ID</TableHead>
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

  if(dataCategories.length === 0){
    return(
      <div className="flex flex-1 flex-col items-center justify-center h-full p-4">
        <div className="text-center rounded-xl bg-muted/50 p-6">
          <p className="text-lg font-semibold">⚠ No Categories Yet</p>
        </div>
      </div>
    )
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
          {dataCategories.map((category) => (
              <Category
                  key={category.id}
                  category={category}
                  updateFeature={<UpdateCategory updateCategoryData={category} />}
                  deleteFeature={<DeleteCategory deleteCategoryId={category.id} />}
                  viewFeature={<ViewSubCategory categoryId={category.id}/>}
              />
          ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
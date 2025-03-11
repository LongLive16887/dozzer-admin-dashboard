import { useGetSubCategoriesQuery } from "@/shared/api/subcategories";
import { useParams, Link } from "react-router-dom";
import {
  UpdateSubcategory,
  DeleteSubCategory,
  ViewItems
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

export const SubCategoriesList = () => {
  const { categoryId } = useParams();

  const { data, isLoading, error } = useGetSubCategoriesQuery({ id: categoryId! });
  const dataCategories = data?.data.results || [];


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
                    <Skeleton className="h-[20.8px] w-full m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-[20.8px] w-full m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-full m-[5px]" />
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
          ❌ Error fetching subcategories. Please try again.
        </div>
      </div>
    );
  }

  if ( dataCategories.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center h-full p-4">
      <div className="text-center rounded-xl bg-muted/50 p-6">
        <p className="text-lg font-semibold">⚠ No Subcategories Yet</p>
        <Link to="/categories" className="text-blue-500 underline mt-2 inline-block">
          Go to categories page
        </Link>
        <p>or create subcategory</p>
      </div>
      </div>
    )
  }

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
          {dataCategories.map((subCategory) => (
                <SubCategory
                    key={subCategory.id}
                    subCategory={subCategory}
                    updateFeature={<UpdateSubcategory updateSubCategoryData={subCategory} />}
                    deleteFeature={<DeleteSubCategory deleteSubCategoryId={subCategory.id} />}
                    viewItems={<ViewItems subcategoryId={subCategory.id}/>}
                />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

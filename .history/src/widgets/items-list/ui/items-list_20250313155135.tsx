import { useGetItemsBySubcategoryQuery } from "@/shared/api/items";
import { useLocation } from "react-router-dom";
import {
  ViewItem
} from "@/features/items";

import { Item } from "@/entities";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";

export const ItemsList = () => {
  const location = useLocation();
  const {subcategoryId} = location.state || {};
  
  const { data, isLoading, error } = useGetItemsBySubcategoryQuery(subcategoryId!);
  const dataItems = data?.data.results || [];

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        
        <div className="rounded-xl bg-muted/50 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>INFO</TableHead>
                <TableHead>IMG</TableHead>
                <TableHead>SMENU PRICE</TableHead>
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
          ❌ Error fetching items. Please try again.
        </div>
      </div>
    );
  }

  if(dataItems.length === 0){
    return(
      <div className="flex flex-1 flex-col items-center justify-center h-full p-4">
        <div className="text-center rounded-xl bg-muted/50 p-6">
          <p className="text-lg font-semibold">⚠ No items Yet</p>
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
            <TableHead>NAME</TableHead>
            <TableHead>INFO</TableHead>
            <TableHead>IMG</TableHead>
            <TableHead>SMENU PRICE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {dataItems.map((item) => (
              <Item
                  key={item.id}
                  item={item}
                  viewFeature={<ViewItem itemId={item.id}/>}
              />
          ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
import { useGetBasesQuery } from "@/shared/api/bases";
import { UpdateBase } from "@/features/base/update-base/ui/update-base";

import { Base } from "@/entities";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";

export const BasesList = () => {
  const { data, isLoading, error } = useGetBasesQuery();
  const dataBases = data?.data.results || [];

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl bg-muted/50 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>LAT</TableHead>
                <TableHead>LONG</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead className="text-right">UPDATE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20.8px] w-[full] m-[5px]" />
                  </TableCell>
                  <TableCell className="text-right">
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
          ❌ Error fetching bases. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="rounded-xl bg-muted/50 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>LAT</TableHead>
              <TableHead>LONG</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead className="text-right">UPDATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataBases.length > 0 ? (
              dataBases.map((base) => (
                <Base
                  key={base.id}
                  base={base}
                  updateFeature={<UpdateBase updateBaseData={base} />}
                />
              ))
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center h-full p-4">
                <div className="text-center rounded-xl bg-muted/50 p-6">
                  <p className="text-lg font-semibold">⚠ No Bases Yet</p>
                </div>
              </div>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
import { useGetBasesQuery } from "@/shared/api/base";
import { UpdateBase } from "@/features/bases";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
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
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-[20.8px] w-full m-[5px]" />
                  </TableCell>
                  <TableCell colSpan={2}>
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
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataBases.length > 0 ? (
              dataBases.map((base) => (
                <TableRow key={base.id}>
                  <TableCell>{base.id}</TableCell>
                  <TableCell>{base.lat}</TableCell>
                  <TableCell>{base.long}</TableCell>
                  <TableCell>{base.name}</TableCell>
                  <TableCell className="text-right">
                    <UpdateBase updateBaseData={base} />
                  </TableCell>
                </TableRow>
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

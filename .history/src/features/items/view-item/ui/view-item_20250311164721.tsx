import { useState, useEffect } from "react";
import { useGetItemByIdQuery } from "@/shared/api/items";
import { Button } from "@/shared/ui/button";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Carousel, CarouselItem, CarouselContent, CarouselPrevious, CarouselNext } from "@/shared/ui/carousel";
import { Label } from "@/shared/ui/label";
import { LanguageSelector } from "@/features";

export const ViewItem = ({ itemId }: { itemId: string }) => {
  const [showModal, setShowModal] = useState(false);
  const { data: item, isLoading: isFetching, isError } = useGetItemByIdQuery(itemId);
  const result = item?.data;
  const selectedLanguage = useSelector((state: RootState) => state.language.selectedLanguage);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch", { description: "Fail to fetch item data" });
    }
  }, [isError]);

  if (isFetching) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!result) return null;

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer min-w-[40px] shadow-md hover:shadow-lg transition">
          <Eye className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[600px] overflow-scroll p-6 rounded-lg shadow-xl bg-white dark:bg-gray-900">
        <DialogHeader>
          <LanguageSelector />
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white text-center">Item Details</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-300 text-center">
            View detailed information about the item
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-gray-800 dark:text-white">
          <div className="space-y-1">
            <Label className="font-semibold">ID:</Label>
            <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">{result.id}</p>
          </div>

          <div className="space-y-1">
            <Label className="font-semibold">Name:</Label>
            <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
              {selectedLanguage === "uz" ? result.name_uz : result.name_ru ?? "No Data"}
            </p>
          </div>

          <div className="space-y-1">
            <Label className="font-semibold">Short Info:</Label>
            <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
              {selectedLanguage === "uz" ? result.short_info_uz : result.short_info_ru ?? "No Data"}
            </p>
          </div>

          <div className="space-y-1">
            <Label className="font-semibold">Main Image:</Label>
            <img src={result.image} alt="Main" className="w-full max-w-xs  h-auto rounded-md shadow-md" />
          </div>

          {result.photos?.length > 0 && (
            <div className="space-y-2">
              <Label className="font-semibold">Photos:</Label>
              <Carousel>
                <CarouselContent className="flex space-x-2">
                  {result.photos.map((photo) => (
                    <CarouselItem key={photo.file_id} className="flex justify-center">
                      <img
                        src={photo.file_path}
                        alt={photo.name}
                        className="w-[120px] h-[80px] object-cover rounded-md shadow-md"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="font-semibold">Vizov Price:</Label>
              <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">{result.vizov_price} UZS</p>
            </div>
            <div className="space-y-1">
              <Label className="font-semibold">Smenu Price:</Label>
              <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">{result.smenu_price} UZS</p>
            </div>
            <div className="space-y-1">
              <Label className="font-semibold">Hourly Price:</Label>
              <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">{result.hourly_price} UZS</p>
            </div>
            <div className="space-y-1">
              <Label className="font-semibold">Smenu Duration:</Label>
              <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">{result.smenu_duration} hours</p>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="font-semibold">Begin Date:</Label>
            <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">{new Date(result.begin_date).toLocaleString()}</p>
          </div>

          <div className="space-y-1">
            <Label className="font-semibold">Description:</Label>
            <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
              {selectedLanguage === "uz" ? result.description_uz : result.description_ru ?? "No Data"}
            </p>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-md transition"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

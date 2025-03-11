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

  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch", { description: "Fail to fetch item data" });
    }
  }, [isError]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!result) return null; // Защита от undefined

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer min-w-[40px]" variant="default">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[700px] overflow-scroll">
        <DialogHeader>
          <LanguageSelector/>
          <DialogTitle>Item Details</DialogTitle>
          <DialogDescription>View detailed information about the item</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label>ID:</Label>
          <p>{result.id}</p>

          <Label>Name ({selectedLanguage}):</Label>
          <p>{selectedLanguage === "uz" ? result.name_uz : result.name_ru ?? "No Data"}</p>

          <Label>Short Info ({selectedLanguage}):</Label>
          <p>{result.short_info_uz}</p>


          <Label>Main Image:</Label>
          <img src={result.image} alt="Main" className="w-full h-auto rounded-md" />

          <Label>Photos:</Label>
          {result.photos?.length > 0 && (
            <Carousel>
              <CarouselContent>
                {result.photos.map((photo) => (
                  <CarouselItem key={photo.file_id} className="flex justify-center">
                    <img src={photo.file_path} alt={photo.name} className="w-full h-auto rounded-md" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}

          <Label>Pricing:</Label>
          <p>Vizov Price: {result.vizov_price} UZS</p>
          <p>Smenu Price: {result.smenu_price} UZS</p>
          <p>Hourly Price: {result.hourly_price} UZS</p>
          <p>Smenu Duration: {result.smenu_duration} hours</p>

          <Label>Begin Date:</Label>
          <p>{new Date(result.begin_date).toLocaleString()}</p>

          <Label>Description (UZ):</Label>
          <p>{result.description_uz}</p>

          <Label>Description (RU):</Label>
          <p>{result.description_ru}</p>
        </div>
        <DialogFooter className="mt-4">
          <Button className="cursor-pointer" variant="destructive" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { useState } from "react";
import { useGetItemByIdQuery } from "@/shared/api/items";
import { Button } from "@/shared/ui/button";
import { RefreshCcw } from "lucide-react";
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

export const ViewItemModal = ({ itemId }: { itemId: string }) => {
  const [showModal, setShowModal] = useState(false);
  const { data: item, isLoading: isFetching } = useGetItemByIdQuery(itemId);

  const result = item?.data


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Error loading item data</p>;
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer min-w-[40px]" variant="default">
          <RefreshCcw />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[700px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
          <DialogDescription>View detailed information about the item</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label>ID:</Label>
          <p>{data.id}</p>

          <Label>Name (UZ):</Label>
          <p>{data.name_uz}</p>
          
          <Label>Name (RU):</Label>
          <p>{data.name_ru}</p>

          <Label>Short Info (UZ):</Label>
          <p>{data.short_info_uz}</p>

          <Label>Short Info (RU):</Label>
          <p>{data.short_info_ru}</p>

          <Label>Main Image:</Label>
          <img src={data.image} alt="Main" className="w-full h-auto rounded-md" />

          <Label>Photos:</Label>
          {data.photos.length > 0 && (
            <Carousel>
              <CarouselContent>
                {data.photos.map((photo) => (
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
          <p>Vizov Price: {data.vizov_price} UZS</p>
          <p>Smenu Price: {data.smenu_price} UZS</p>
          <p>Hourly Price: {data.hourly_price} UZS</p>
          <p>Smenu Duration: {data.smenu_duration} hours</p>

          <Label>Begin Date:</Label>
          <p>{new Date(data.begin_date).toLocaleString()}</p>

          <Label>Description (UZ):</Label>
          <p>{data.description_uz}</p>

          <Label>Description (RU):</Label>
          <p>{data.description_ru}</p>
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

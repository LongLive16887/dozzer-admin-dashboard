interface Photo {
    file_id: string;
    name: string;
    file_path: string;
    size: number;
    extension: string;
    is_main: boolean;
  }
  
interface Item {
    id: string;
    name_uz: string;
    name_ru: string;
    short_info_uz: string;
    short_info_ru: string;
    image: string;
    photos: Photo[];
    vizov_price: number;
    smenu_price: number;
    smenu_duration: number;
    hourly_price: number;
    begin_date: string; 
    description_uz: string;
    description_ru: string;
    sub_category_id: string;
    category_id: string;
    base_id: string;
  }
  
  interface IItemsResponse{
    error: boolean;
    data: Item | Item[]
  }


  interface IItemsSuccesResponse{
    error:
  }
 

  export type {IItemsResponse};
  
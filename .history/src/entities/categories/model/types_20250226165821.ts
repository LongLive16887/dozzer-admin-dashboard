import { ICategoryResponse } from "@/shared/model/categories";

interface ICategory {
  category: ICategoryResponse;
  updateFeature: React.JSX.Element;
  deleteFeature: JSX.Element;
}

export type { ICategory };
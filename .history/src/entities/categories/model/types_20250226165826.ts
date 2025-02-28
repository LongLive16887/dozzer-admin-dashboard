import { ICategoryResponse } from "@/shared/model/categories";

interface ICategory {
  category: ICategoryResponse;
  updateFeature: React.JSX.Element;
  deleteFeature: React.Element;
}

export type { ICategory };
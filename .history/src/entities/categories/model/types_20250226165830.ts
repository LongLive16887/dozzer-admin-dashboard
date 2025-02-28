import { ICategoryResponse } from "@/shared/model/categories";

interface ICategory {
  category: ICategoryResponse;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
}

export type { ICategory };
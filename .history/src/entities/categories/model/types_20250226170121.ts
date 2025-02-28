import { ICategoryResponse } from "@/shared/model/categories";

interface ICategory {
  category: ICategoryResponse;
  updateFeature: JS.Element;
  deleteFeature: React.JSX.Element;
}

export type { ICategory };
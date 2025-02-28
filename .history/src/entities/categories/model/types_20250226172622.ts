import { ICategoryResponse } from "@/shared/model/categories";

interface ICategory {
  category: ICategoryResponseOb;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
}

export type { ICategory };
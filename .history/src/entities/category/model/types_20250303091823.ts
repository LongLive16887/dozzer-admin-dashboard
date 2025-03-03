import { ICategoryResponseObject } from "@/shared/model/categories";

interface ICategory {
  category: ICategoryResponseObject;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
  viewFeature: React.JSX.Element;
}

export type { ICategory };
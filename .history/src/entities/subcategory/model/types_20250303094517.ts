import { ISubCategoryResponseObject } from "@/shared/model/subcategories";

interface ISubCategory {
  category: ISubCategoryResponseObject;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
}

export type { ICategory };
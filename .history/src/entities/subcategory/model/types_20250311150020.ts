import { ISubCategoryResponseObject } from "@/shared/model/subcategories";

interface ISubCategory {
  subCategory: ISubCategoryResponseObject;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
  view
}

export type { ISubCategory };
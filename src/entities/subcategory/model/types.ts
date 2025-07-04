import { ISubCategoryResponseObject } from "@/shared/model/subcategories";

interface ISubCategory {
  subCategory: ISubCategoryResponseObject;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
  viewItems: React.JSX.Element;
}

export type { ISubCategory };
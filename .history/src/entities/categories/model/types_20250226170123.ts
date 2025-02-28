import { ICategoryResponse } from "@/shared/model/categories";
import { JSX } from "react";

interface ICategory {
  category: ICategoryResponse;
  updateFeature: JSX.Element;
  deleteFeature: React.JSX.Element;
}

export type { ICategory };
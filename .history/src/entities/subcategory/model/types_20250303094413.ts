import { ICategoryResponseObject } from "@/shared/model/categories";
import React from "react";

interface ICategory {
  category: ICategoryResponseObject;
  updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element
}

export type { ICategory };
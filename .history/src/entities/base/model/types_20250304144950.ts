import { IBaseResponseObject } from "@/shared/model/base"


interface IBase {
    base: IBaseResponseObject;
    updateFeature: React.JSX.Element;
  deleteFeature: React.JSX.Element;
  viewFeature: React.JSX.Element;
}
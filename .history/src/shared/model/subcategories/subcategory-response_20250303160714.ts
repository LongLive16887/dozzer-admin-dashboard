/* Sub Category object */
interface ISubCategoryResponseObject {
    id: string;
    name: string;
    image_url?: string;
    category_id: string;
  }
  
  /* Ошибочный респонс */
  interface IErrorResponse {
    error: true;
    data: {
      status: number;
      message: string;
    };
  }
  
  /* Успешный респонс с результатами */
  interface ISuccessResponseWithResults {
    error: false;
    data: {
      results: ISubCategoryResponseObject[];
      count: number;
    };
  }
  
  /* Успешный респонс с числом */
  interface ISuccessResponseWithCode {
    error: false;
    data: number;
  }
  
  /* Общий тип для SubCategory */
  type ISubCategoryResponse =
    | IErrorResponse
    | ISuccessResponseWithResults<ISubCategoryResponseObject>
    | ISuccessResponseWithCode;
  
  export type {
    ISubCategoryResponse,
    ISubCategoryResponseObject,
    IErrorResponse,
    ISuccessResponseWithResults,
    ISuccessResponseWithCode,
  };
  
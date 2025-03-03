interface ICategoryResponseObject {
    id: string;
    name: string;
    image_url?: string;
    created_by: number;
    updated_by: number;
  }
  
  // Ошибочный респонс
  interface IErrorResponse {
    error: true;
    data: {
      status: number;
      message: string;
    };
  }
  
  // Успешный респонс с результатами
  interface ISuccessResponseWithResults {
    error: false;
    data: {
      results: ICategoryResponseObject[];
      count: number;
    };
  }
  
  // Успешный респонс с числом
  interface ISuccessResponseWithCode {
    error: false;
    data: number;
  }
  
  // Общий тип для всех респонсов
  type ICategoryResponse =
    | IErrorResponse
    | ISuccessResponseWithResults
    | ISuccessResponseWithCode;

export type {ICategoryResponse, ICategoryResponseObject};
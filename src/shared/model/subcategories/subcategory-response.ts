/* Sub Category object*/
interface ISubCategoryResponseObject {
    id: string;
    name_uz: string;
    name_ru: string;
    image_url?: string;
    category_id: string;
} 

/* CRUD response */

interface IDeleteSubCategoryResponse{
    error: boolean;
    data: number;
}

interface ISubCategoryResponse{
    error: boolean;
    data: {
        id: string;
        status: number;
    }
}

interface IGetSubCategoryResponse{
    error: boolean;
    data: {
        results: ISubCategoryResponseObject[];
        count: number;
    }
}

export type {ISubCategoryResponse, ISubCategoryResponseObject,IGetSubCategoryResponse,IDeleteSubCategoryResponse};
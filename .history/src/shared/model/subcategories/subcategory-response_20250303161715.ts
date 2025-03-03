/* Sub Category object*/
interface ISubCategoryResponseObject {
    id: string;
    name: string;
    image_url?: string;
    category_id: string;
} 

/* CRUD response */

interface ISubCategorySuccesResponse {
    error: boolean;
    data: number;
}

interface ISubCategoryResponse{
    error: boolean;
    data: {
        results: ISubCategoryResponseObject[],
        count: number;
    } | number;
}

export type {ISubCategoryResponse, ISubCategoryResponseObject,ISubCategorySuccesResponse};
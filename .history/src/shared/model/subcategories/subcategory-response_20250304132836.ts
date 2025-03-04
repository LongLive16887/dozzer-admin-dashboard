/* Sub Category object*/
interface ISubCategoryResponseObject {
    id: string;
    name: string;
    image_url?: string;
    category_id: string;
} 

/* CRUD response */

interface ISubCategoryResponse{
    error: boolean;
    data: number
}

interface IGetSubCategoryResponse{
    error: boolean;
    data: {
        results: ISubCategoryResponseObject[];
        count: number;
    }
}

export type {ISubCategoryResponse, ISubCategoryResponseObject,IGetSubCategoryResponse};
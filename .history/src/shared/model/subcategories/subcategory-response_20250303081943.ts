/* Sub Category object*/
interface ISubCategoryResponseObject {
    id: string;
    name: string;
    image_url?: string;
    category: number;
    updated_by: number;
} 

/* CRUD response */
interface ISubCategoryResponse{
    error: boolean;
    data: {
        results: ISubCategoryResponseObject[],
        count: number;
    } | number;
}

export type {ISubCategoryResponse, ISubCategoryResponseObject};
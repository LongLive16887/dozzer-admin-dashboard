/* Sub Category object*/
interface ISubCategoryResponseObject {
    id: string;
    name: string;
    image_url?: string;
    created_by: number;
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
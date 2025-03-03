/* Sub Category object*/
interface ISubCategoryResponseObject {
    id: string;
    name: string;
    image_url?: string;
    created_by: number;
    updated_by: number;
} 

/* CRUD response */
interface ICategoryResponse{
    error: boolean;
    data: {
        results: ISubCategoryResponseObject[],
        count: number;
    } | number;
}

export type {ICategoryResponse, ISubCategoryResponseObject};
/* Category object*/
interface ICategoryResponseObject {
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
        results: ICategoryResponseObject[],
        count: number;
    } | number;
}

interface IGetCategoryResponse{
    error: boolean;
    data: {
        results: ICategoryResponseObject[0]
    }
}

export type {ICategoryResponse, ICategoryResponseObject};
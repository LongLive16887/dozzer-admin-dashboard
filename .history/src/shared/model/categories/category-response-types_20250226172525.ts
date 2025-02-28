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

export type {ICategoryResponse};
/* Category */
interface ICategoryResponseObject {
    id: string;
    name: string;
    image_url?: string;
    created_by: number;
    updated_by: number;
} 

/* Create, Update , Get response */
interface ICategoryResponse{
    error: boolean;
    data: {
        results: ICategoryResponseObject[],
        count: number;
    } | number;
}

export type {ICategoryResponse};
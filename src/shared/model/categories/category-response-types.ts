/* Category object*/
interface ICategoryResponseObject {
    id: string;
    name_uz: string;
    name_ru: string;
    image_url?: string;
    created_by: number;
    updated_by: number;
} 

/* CRUD response */
interface ICategoryResponse{
    error: boolean;
    data: {
        id: string;
        status: number
    };
}

interface IDeleteCategoryResponse{
    error: boolean;
    data: number;
}

/* 
http://api1.dozzer.uz/api/v1/base/category/
https://api1.dozzer.uz//api/v1/base/category
*/

interface IGetCategoryResponse{
    error: boolean;
    data: {
        results: ICategoryResponseObject[],
        count: number;
    }
}

export type {ICategoryResponse, ICategoryResponseObject,IGetCategoryResponse,IDeleteCategoryResponse};
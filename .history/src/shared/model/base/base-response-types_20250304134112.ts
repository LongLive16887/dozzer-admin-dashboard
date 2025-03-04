interface IBaseResponseObject {
    id: string;
    name: string;
    lat: number;
    long: number;
}


interface IBaseResponse {
    error: boolean;
    data:  number;
}

interface IGetBasesResponse{
    error: boolean;
    data: IBaseResponseObject[];
}

interface IGetBaseResponse{
    error: boolean;
    data: IBaseResponseObject;
}

interface ICreateBaseResponse{
    error: boolean
}

export type {IBaseResponse,IBaseResponseObject,IGetBasesResponse,IGetBaseResponse};



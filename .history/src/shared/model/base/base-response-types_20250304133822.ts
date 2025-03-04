interface IBaseResponseObject {
    id: string;
    name: string;
    lat: number;
    long: number;
}


interface IBaseResponse {
    error: boolean;
    data: IBaseResponseObject[] | IBaseResponseObject | number
}

interface IGetBasesResponse{
    error: boolean;
    data: IBaseResponseObject[];
}

interface IGetBaseResponse{
    error: boolean;
    data: 
}

export type {IBaseResponse,IBaseResponseObject,IGetBasesResponse};



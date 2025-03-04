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


export type {IBaseResponse};



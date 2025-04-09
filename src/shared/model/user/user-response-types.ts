interface IUpdateUserResponse {
    error: boolean;
    data: string;
}

interface IUserResponse {
    error: boolean;
    data: {
        id: string;
        name?: string;
        phone_number?: string;
    }
}

interface IUpdateUser{
    phone_number: string;
    name: string;
}

export type {IUserResponse,IUpdateUserResponse,IUpdateUser};
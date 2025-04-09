interface IAuthTokensResponse {
    error: boolean;
    data: {
        status: number;
        token: {
            Access: string;
            Refresh: string;
        }
    }
}

export type { IAuthTokensResponse };
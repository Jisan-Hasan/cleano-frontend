export interface IMeta {
    limit: number;
    page: number;
    size: number;
}

export type ResponseSuccessType = {
    data: any;
    meta?: IMeta;
    message?: string;
};

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

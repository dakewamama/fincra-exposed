export interface FincraResponse<T> {
    status: boolean;
    message: string;
    data: T;
}
export interface Business {
    id: string;
    name: string;
    email: string;
    country: string;
    currency: string;
    status: string;
    createdAt: string;
}
export type BusinessResponse = FincraResponse<Business>;

export type UserProductDto = {
    id: number;
    userId: string;
    productId: string;
    isEnabled: boolean;
    config: string;
    accessToken: string;
    refreshToken: string;
};

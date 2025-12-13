import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from 'src/products/service/products.service';
import { UsersProductsService } from 'src/users-products/service/users-products.service';

@Injectable()
export class SpotifyUtilsService {
    constructor(
        private readonly productsService: ProductsService,
        private readonly usersProductsService: UsersProductsService,
        private readonly httpService: HttpService
    ){}

    private async getTokens(clientId: string, code: string): Promise<{accessToken:string, refreshToken:string}> { 
        const product = await this.productsService.getProduct(clientId)
        if (product === null) throw error

        const authHeader = Buffer.from(`${clientId}:${product.clientSecret}`).toString('base64')
        const body = new URLSearchParams({
            code,
            redirect_uri: product.redirectUri,
            grant_type: 'authorization_code',
        })        

        const response = await lastValueFrom(
            this.httpService.post(
                'https://accounts.spotify.com/api/token',
                body.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${authHeader}`,
                    }
                }
            )
        )
        return { 
            accessToken : response.data.access_token,
            refreshToken: response.data.refresh_token
        }
    }

    private async getSpotifyId(accessToken: string): Promise<string> { 
        const response = await lastValueFrom(
            this.httpService.get(
                'https://api.spotify.com/v1/me',
                { headers: { 'Authorization': 'Bearer ' + accessToken }}
            )
        )
        return response.data.id
    }

    async authorizationCodeCallback(clientId: string, code: string, state: string) {
        if (state === null) return

        const { accessToken, refreshToken } = await this.getTokens(clientId, code)
        const spotifyId = await this.getSpotifyId(accessToken)
        this.usersProductsService.createUserProduct(spotifyId,clientId,accessToken, refreshToken)
    }
}

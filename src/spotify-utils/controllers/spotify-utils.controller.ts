import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpotifyUtilsService } from '../services/spotify-utils.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('utils')
export class SpotifyUtilsController {
    constructor(private readonly spotifyUtilsService: SpotifyUtilsService) {}

    @Public()
    @Get(':productId/callback')
    async authorizationCodeCallback(
        @Param('productId') productId: string,
        @Query('code') code: string,
        @Query('state') state: string,
    ) {
        await this.spotifyUtilsService.authorizationCodeCallback(
            productId,
            code,
            state,
        );
    }
}

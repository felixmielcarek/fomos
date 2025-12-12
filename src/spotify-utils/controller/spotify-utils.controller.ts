import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { SpotifyUtilsService } from '../service/spotify-utils.service';

@Controller('utils')
export class SpotifyUtilsController {
    constructor(private readonly spotifyUtilsService: SpotifyUtilsService){}

    @Get(":clientId/callback")
    async authorizationCodeCallback(@Param('clientId') clientId: string, @Query('code') code: string, @Query('state') state: string) {
        await this.spotifyUtilsService.authorizationCodeCallback(clientId, code, state)
    }        
}

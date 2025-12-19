import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

export function buildJwtOptionsByKey(
    configService: ConfigService,
    key: 'jwt' | 'refreshJwt',
) {
    const secret = configService.getOrThrow<string>(`${key}.secret`);
    const expiresIn = configService.getOrThrow<StringValue>(`${key}.expiresIn`);

    switch (key) {
        case 'jwt':
            return { secret: secret, signOptions: { expiresIn: expiresIn } };
        case 'refreshJwt':
            return { secret: secret, expiresIn: expiresIn };
    }
}

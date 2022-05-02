import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('test')
    @UseGuards(AuthGuard()) // useGuards, AuthGuard 인증 미들웨어
    test(@GetUser() user: User) { // GetUser() custom decorator
        console.log('user', user);
    }
}

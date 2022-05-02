import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from './user.entity';

@Injectable() // 어디에서나 주입하여 사용할 수 있도록 하는 데코레이터
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'dw1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: User): Promise<User> {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }
        
        return user;
    }
}
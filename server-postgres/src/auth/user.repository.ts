import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    // Create
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;
        const salt = await bcrypt.genSalt(); // 임의의 문자열
        const hashedPassword = await bcrypt.hash(password, salt); // 비밀번호 암호화
        const user = this.create({ username, password: hashedPassword });

        try {
            await this.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }
}
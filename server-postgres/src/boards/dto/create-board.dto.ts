import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty() // 빈값 유효성 체크 - Pipe
    title: string;

    @IsNotEmpty() // 빈값 유효성 체크 - Pipe
    description: string;
}
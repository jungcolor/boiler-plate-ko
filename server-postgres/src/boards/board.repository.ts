import { CreateBoardDto } from './dto/create-board.dto';
import { EntityRepository, QueryResult, Repository } from "typeorm";
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

// DB관련된 로직 처리
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
    // Create
    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            user,
            title,
            description,
            status: BoardStatus.PUBLIC,
        });

        await this.save(board);

        return board;
    }

    // Read - ALL
    async getAllBoards(): Promise<Board[]> {
        return await this.find();
    }

    // Read - User
    async getUserBoards(user: User): Promise<Board[]> {
        const query = this.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        // 해당 유저의 모든 결과물을 가져옴 -> getOne() > 하나의 결과물만 가져옴
        const boards = await query.getMany();

        return boards;
    }

    // Read - ID
    async getBoardById(id: number): Promise<Board> {
        const found = await this.findOne(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // Update
    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.save(board);

        return board;
    }

    // Delete - ID
    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.delete({ id, user });

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }
}
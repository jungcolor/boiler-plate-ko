import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

// Controller에서 사용할 복잡한 로직 처리
@Injectable()
export class BoardsService {
    constructor (
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    // Create
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    // createBoard(createBoardDto: CreateBoardDto): Board {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     };

    //     this.boards.push(board);
    //     return board;
    // }

    // Read - ALL
    getAllBoards(): Promise<Board[]> {
        return this.boardRepository.getAllBoards();
    }
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // Read - User
    getUserBoards(user: User): Promise<Board[]> {
        return this.boardRepository.getUserBoards(user);
    }

    // Read - ID
    getBoardById(id: number): Promise<Board> {
        return this.boardRepository.getBoardById(id);
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     console.log(this.boards);

    //     if (!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }

    //     return found;
    // }

    // Update
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        return this.boardRepository.updateBoardStatus(id, status);
    }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);

    //     board.status = status;
    //     return board;
    // }

    // Delete - ID
    deleteBoard(id: number, user: User): Promise<void> {
        return this.boardRepository.deleteBoard(id, user);
    }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }
}
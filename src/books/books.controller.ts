import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDto } from './dto/books.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @ApiOperation({
    summary: 'books에 book 추가',
    description: 'books에 book 객체를 추가합니다.',
  })
  @ApiBody({
    type: CreateBookDto,
  })
  @ApiResponse({
    status: 200,
    description: 'book 객체 생성 성공',
  })
  @ApiResponse({
    status: 400,
    description: 'book 객체 생성 실패',
  })
  async create(@Body() book: CreateBookDto): Promise<BooksDto> {
    return await this.booksService.create(book);
  }

  @Get()
  @ApiOperation({
    summary: 'books를 모두 출력',
    description: 'books를 모두 출력합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'books를 모두 출력 성공',
    type: BooksDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'books를 모두 출력 실패',
  })
  async findAll(): Promise<BooksDto[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOperation({
    summary: 'books 중 특정 book을 출력',
    description: 'books 중 특정 book을 출력합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'books 중 특정 book을 출력 성공',
    type: BooksDto,
  })
  @ApiResponse({
    status: 400,
    description: 'books 중 특정 book을 출력 실패',
  })
  async findOne(@Param('id') id: string): Promise<BooksDto> {
    // http://localhost:3000/books/3
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'books 중 특정 book 업데이트',
    description: 'books 중 특정 book 업데이트를 합니다.',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: UpdateBookDto,
  })
  @ApiResponse({
    status: 200,
    description: 'book 객체 업데이트 성공',
  })
  @ApiResponse({
    status: 400,
    description: 'book 객체 업데이트 실패',
  })
  async update(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<number> {
    return this.booksService.update(+id, book);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOperation({
    summary: 'books 중 특정 book을 삭제',
    description: 'books 중 특정 book을 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'books 중 특정 book을 삭제 성공',
  })
  @ApiResponse({
    status: 400,
    description: 'books 중 특정 book을 삭제 실패',
  })
  async remove(@Param('id') id: string): Promise<number> {
    return this.booksService.remove(+id);
  }
}

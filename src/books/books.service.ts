import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ) {}

  async create(book: BookEntity): Promise<BookEntity> {
    const newBook = this.booksRepository.create(book);
    return await this.booksRepository.save(newBook);
  }

  async findAll(): Promise<BookEntity[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<BookEntity> {
    return await this.booksRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, book: BookEntity): Promise<number> {
    await this.booksRepository.update(id, book);
    return id;
  }

  async remove(id: number): Promise<number> {
    await this.booksRepository.delete(id);
    return id;
  }
}

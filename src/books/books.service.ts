import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDto } from './dto/books.dto';

@Injectable()
export class BooksService {
  /**
   * booksRepository는 BooksService 클래스 내에서 사용되는
   * BookEntity에 연결된TypeORM Repository 인스턴스입니다.
   * 이 인스턴스는 @InjectRepository(BookEntity) 데코레이터를 통해 의존성 주입으로 제공됩니다.
   *
   * NestJS와 TypeORM을 함께 사용할 때,
   * 이 데코레이터는 특정 엔티티 유형(BookEntity와 같은)에 대한 Repository를 서비스에 주입하는 역할을 합니다.
   * 이로 인해 데이터베이스 작업을 추상화하고, SQL 쿼리를 직접 작성하지 않고도 데이터베이스 CRUD(Create, Read, Update, Delete) 작업을 수행할 수 있습니다.
   */
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ) {}

  async create(book: CreateBookDto): Promise<BooksDto> {
    /**
     * create 메소드는 새로운 BookEntity 인스턴스를 메모리 상에서 생성하며,
     * 주어진 객체(book)의 데이터를 사용하여 이 인스턴스를 초기화합니다.
     * 이 메소드는 데이터베이스에 데이터를 삽입하지 않고,
     * 단지 새로운 엔티티 인스턴스를 만드는 데 사용됩니다.
     * SQL INSERT 문을 실행하지는 않습니다.
     */
    const newBook = this.booksRepository.create(book);

    /**
     * save 메소드는 변경된 엔티티를 데이터베이스에 저장합니다.
     * 이 메소드가 호출되면, TypeORM은 해당 엔티티가 새로운 것인지 기존 것인지를 판단하고,
     * 적절한 SQL INSERT 또는 UPDATE 문을 데이터베이스에 보냅니다.
     *
     * 즉, save 메소드는 데이터베이스에 실제로 데이터를 삽입하거나 업데이트하는 데 사용됩니다.
     */
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

  async update(id: number, book: UpdateBookDto): Promise<number> {
    await this.booksRepository.update(id, book);
    return id;
  }

  async remove(id: number): Promise<number> {
    await this.booksRepository.delete(id);
    return id;
  }
}

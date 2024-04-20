import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { BookEntity } from './books/entities/book.entity';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

dotenv.config();
console.log(process.env);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.development.env'
          : '.production.env',
    }),
    /**
     * TypeOrmModule.forRoot({ ... }):
     * TypeORM 설정을 초기화합니다.
     * forRoot() 메서드는 TypeORM 모듈을 초기화하는 데 필요한 설정 객체를 반환합니다.
     */
    TypeOrmModule.forRoot({
      /**
       * type: 사용할 데이터베이스 종류를 지정합니다. 이 경우 mysql을 사용합니다.
       */
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      /**
       * database: 사용할 데이터베이스 이름을 지정합니다.
       */
      database: process.env.DATABASE,
      /**
       * entities: 사용할 엔티티 클래스를 지정합니다. 이 경우 BookEntity를 사용합니다.
       */
      entities: [BookEntity],
      /**
       * synchronize: 엔티티와 데이터베이스 테이블을
       * 자동으로 동기화할지 여부를 지정합니다.
       * 이 경우 true로 설정하여 자동 동기화를 활성화합니다.
       *
       * 테이블이 없으면 자동으로 생성합니다.
       *
       * 개발모드에서만 사용해야합니다.
       */
      synchronize: process.env.NODE_ENV === 'development',
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

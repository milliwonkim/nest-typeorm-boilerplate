import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    description: 'books에 추가할 책 이름',
    default: 'kiwonnnnnn',
  })
  author?: string;

  @ApiProperty({
    description: 'books에 추가할 책 이름',
    default: 'learning nestjs2',
  })
  name?: string;
}

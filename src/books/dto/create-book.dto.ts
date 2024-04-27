import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'books에 추가할 사람이름',
    default: 'kiwonkim22',
  })
  author: string;

  @ApiProperty({
    description: 'books에 추가할 책 이름',
    default: 'learning nestjs',
  })
  name: string;
}

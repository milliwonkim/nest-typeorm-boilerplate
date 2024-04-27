import { ApiProperty } from '@nestjs/swagger';

export class BooksDto {
  @ApiProperty({
    description: '자동으로 생성되는 아이디',
    default: 1,
  })
  id: number;

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

  @ApiProperty({
    description: 'book이 만들어진 시간',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'book이 수정된 시간',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'book이 삭제된 시간',
  })
  deletedAt: Date;
}

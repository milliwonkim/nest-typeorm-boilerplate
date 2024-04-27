import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * schema - mysql 데이터베이스이름
 * name - 테이블 이름
 */
@Entity({ schema: process.env.SCHEMA, name: 'book-table' })
export class BookEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ nullable: false, type: 'text', name: 'author' })
  author: string;

  @Column({ nullable: false, name: 'name', type: 'text' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

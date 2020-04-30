import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  description: string;

  @CreateDateColumn()
  publishedAt: string;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: string;
}

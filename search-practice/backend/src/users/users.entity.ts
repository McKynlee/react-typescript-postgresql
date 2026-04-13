// src/users/users.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  // IMPORTANT: tsvector column (no direct writes from app)
  @Column({ type: 'tsvector', nullable: true, select: false })
  search_vector?: string;
}

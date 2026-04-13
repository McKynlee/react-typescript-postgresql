// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mckynlee',
      password: 'postgres',
      database: 'search_demo',
      entities: [User],
      synchronize: true, // dev only
    }),
    UsersModule,
  ],
})
export class AppModule {}

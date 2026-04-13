// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchUsersDto } from './dto/search-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async searchUsers(dto: SearchUsersDto) {
    const search = dto.search?.trim() || '';
    const page = Number(dto.page) || 1;
    const limit = Math.min(Number(dto.limit) || 20, 100);

    const query = this.userRepository.createQueryBuilder('user');

    if (search) {
      const normalizedPhone = search.replace(/\D/g, '');

      query
        .addSelect(
          `
          ts_rank(
            user.search_vector,
            plainto_tsquery(:search)
          )
        `,
          'rank',
        )
        .where(
          `
          user.search_vector @@ plainto_tsquery(:search)
          OR user.phone LIKE :phone
        `,
          {
            search,
            phone: `${normalizedPhone}%`,
          },
        )
        .orderBy('rank', 'DESC');
    } else {
      query.orderBy('user.id', 'ASC');
    }

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

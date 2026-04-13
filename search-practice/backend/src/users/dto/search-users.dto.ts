// src/users/dto/search-users.dto.ts
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class SearchUsersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  page?: string = '1';

  @IsOptional()
  @IsNumberString()
  limit?: string = '20';
}

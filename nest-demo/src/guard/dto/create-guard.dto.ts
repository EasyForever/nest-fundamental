import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  /**
   * A list of user's roles
   * @example ['admin', 'editor']
   */
  roles: string[] = [];
}

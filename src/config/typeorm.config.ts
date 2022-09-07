/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'ofer7412',
  database: 'superstoretest',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

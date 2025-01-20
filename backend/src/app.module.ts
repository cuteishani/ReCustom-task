import { DataSource } from 'typeorm';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 're_custom_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ActivityModule,
    PdfModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

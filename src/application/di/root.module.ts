import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '../api/http-rest/global-exception/global.exception'; 
import { TasksModule } from './task.module';

@Module({
  imports: [TasksModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ]
})
export class RootModule { }

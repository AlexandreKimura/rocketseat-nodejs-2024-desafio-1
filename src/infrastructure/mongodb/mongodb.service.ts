import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { connect, disconnect } from 'mongoose';

export class MongoDbService implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await connect('mongodb://127.0.0.1:27017/desafio1');
  }

  async onModuleDestroy() {
    return await disconnect()
  }
}
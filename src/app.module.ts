/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module';
import config from './config/keys';





@Module({
  imports: [TodoModule, AuthModule,UserModule,MongooseModule.forRoot(config.mongoURI),],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}

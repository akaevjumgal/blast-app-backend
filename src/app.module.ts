import { Module } from '@nestjs/common'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';
import { PostEntity } from './entites/post.entity';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from './common/logging.interceptor'
import { HttpExceptionFilter } from './common/http-exception.filter'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { UserEntity } from './entites/user.entity'

const DATABASE_CONFIGS: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'vzlet',
  entities: [PostEntity, UserEntity],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIGS),
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})

export class AppModule {}

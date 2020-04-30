import { Module } from '@nestjs/common'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';
import { PostEntity } from './entites/post.entity';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from './common/logging.interceptor'
import { HttpExceptionFilter } from './common/http-exception.filter'

const DATABASE_CONFIGS: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'vzlet',
  entities: [PostEntity],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIGS),
    PostModule,
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

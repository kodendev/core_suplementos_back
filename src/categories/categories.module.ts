import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryExistsValidator } from 'src/common/validators/CategoryExists.validator';
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryExistsValidator],
  exports: [CategoriesService, CategoryExistsValidator],
})
export class CategoriesModule {}

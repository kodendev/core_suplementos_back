/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../../categories/categories.service';

@ValidatorConstraint({ name: 'CategoryExists', async: true })
@Injectable()
export class CategoryExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoriesService) {}

  async validate(value: number, args: ValidationArguments) {
    console.log('CategoryExistsValidator called with value:', value);
    console.log(this.categoryService);
    const category = await this.categoryService.findOne(value);
    return !!category;
  }

  defaultMessage(args: ValidationArguments) {
    return `Category with ID ${args.value} does not exist`;
  }
}

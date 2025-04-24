import { registerDecorator, ValidationOptions } from 'class-validator';
import { CategoryExistsValidator } from '../validators/CategoryExists.validator';

export function CategoryExists(validationOptions?: ValidationOptions) {
  console.log('CategoryExists decorator called');
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: CategoryExistsValidator,
    });
  };
}

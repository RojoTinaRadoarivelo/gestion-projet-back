import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            value &&
            (value instanceof Date ||
              (!isNaN(Date.parse(value)) &&
                new Date(value).toString() !== 'Invalid Date'))
          );
        },
        defaultMessage() {
          return 'The given value is an invalid date.';
        },
      },
    });
  };
}

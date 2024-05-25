import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsCPF(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && validateCPF(value);
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        defaultMessage(args: ValidationArguments) {
          return 'Value must be a valid CPF string';
        },
      },
    });
  };
}

function validateCPF(value: string): boolean {
  const cpf = getNumericCharacters(value);

  if (cpf.length !== 11) {
    return false;
  }

  // CPF Validation Algorithm, see more at https://www.macoratti.net/alg_cpf.htm
  const first9Digits = cpf.slice(0, 9);

  let firstNumbersToMultiplicate = 10;
  let sumOfFirstCheckDigit = 0;

  for (const digit of first9Digits) {
    sumOfFirstCheckDigit += parseInt(digit) * firstNumbersToMultiplicate;
    firstNumbersToMultiplicate--;
  }

  const firstCheckDigit =
    sumOfFirstCheckDigit % 11 < 2 ? 0 : 11 - (sumOfFirstCheckDigit % 11);

  // Check if the tenth number in the CPF(which is the first check digit) is equals to the "firstCheckDigit" calculated by the first nine digits.
  // The first check digit is in the "cpf[9]" position.
  if (parseInt(cpf[9]) !== firstCheckDigit) {
    return false;
  }

  const first9DigitsAndFirstCheckDigit = [
    ...first9Digits,
    firstCheckDigit.toString(),
  ];

  let secondNumbersToMultiplicate = 11;
  let sumOfSecondCheckDigit = 0;

  for (const digit of first9DigitsAndFirstCheckDigit) {
    sumOfSecondCheckDigit += parseInt(digit) * secondNumbersToMultiplicate;
    secondNumbersToMultiplicate--;
  }

  const secondCheckDigit =
    sumOfSecondCheckDigit % 11 < 2 ? 0 : 11 - (sumOfSecondCheckDigit % 11);

  // Check if the eleventh number in the CPF(which is the second check digit) is equals to the "secondCheckDigit" calculated by the first nine digits + the first check digit.
  // The second check digit is in the "cpf[10]" position.
  if (parseInt(cpf[10]) !== secondCheckDigit) {
    return false;
  }

  return true;
}

function getNumericCharacters(str: string): string {
  return str.match(/\d/g)?.join('') ?? '';
}

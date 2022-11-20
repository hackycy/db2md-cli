import { InvalidArgumentError, InvalidOptionArgumentError } from 'commander';
import { DocType, DocTypeList } from '../constants/doc-type';

export function checkTypeValidity(value: string) {
  if (!value) return undefined;

  if (!DocTypeList.includes(value as DocType)) {
    throw new InvalidArgumentError(
      'The type is invalid. The optional value has: ' + DocTypeList.join(','),
    );
  }

  return value;
}

export function parsePortNumber(value: string) {
  const num = Number(value);
  if (isNaN(num)) {
    throw new InvalidOptionArgumentError('Port is not a number');
  }
  return num;
}

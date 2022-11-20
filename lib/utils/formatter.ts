import { IndexdRowData } from '../executor';

export function formatterIndexColValue(
  c: IndexdRowData,
  k: keyof IndexdRowData,
): string {
  if (k === 'nonunique') {
    return c[k] === 0 ? 'YES' : 'NO';
  } else if (k === 'nullable') {
    return c[k] === 'YES' ? 'YES' : 'NO';
  }

  return c[k];
}

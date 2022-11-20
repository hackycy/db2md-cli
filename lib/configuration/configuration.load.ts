import { Input } from '../common/command.input';
import { ConnectionOptions } from 'mysql2';

export function loadDatabaseConfiguration(
  inputs: Input[],
): Pick<ConnectionOptions, 'user' | 'database' | 'host' | 'password' | 'port'> {
  const database = inputs.find((e) => e.name === 'database')!.value as string;

  const host = inputs.find((e) => e.name === 'host')!.value as string;
  const user = inputs.find((e) => e.name === 'username')!.value as string;
  const port = inputs.find((e) => e.name === 'port')!.value as number;
  const password = inputs.find((e) => e.name === 'password')!.value as string;

  return {
    database,
    host,
    user,
    port,
    password,
  };
}

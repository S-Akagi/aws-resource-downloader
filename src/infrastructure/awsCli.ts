import { $ } from 'zx';

export async function ExecuteAwsCliCommand(command: string) {
  return $`${command}`;
}

import init, { run as _run } from 'flashfill-core';

let initialized = init();

export async function run(
  inputs: string[][],
  results: Array<string | undefined | null>
): Promise<string[]> {
  await initialized;
  return _run(inputs, results);
}

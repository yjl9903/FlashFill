import init, { run as _run } from 'flashfill-core';

let initialized = init();

export async function run(
  inputs: string[][],
  results: Array<string | undefined | null>
): Promise<string[] | undefined> {
  await initialized;
  try {
    return _run(inputs, results);
  } catch {
    return undefined;
  }
}

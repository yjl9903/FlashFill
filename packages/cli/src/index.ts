import { cac } from 'cac';
import { version } from '../package.json';

import { run } from 'flashfill-core';

const cli = cac();

cli.command('').action(() => {
  console.log('--- Run    ---');
  let res = run(
    [
      ['123', '456', '789'],
      ['abc', 'def', 'ghi']
    ],
    [null, '123']
  );
  console.log('--- Result ---');
  for (let line of res) {
    console.log('Result:', line);
  }
});

cli.help();

cli.version(version);

cli.parse();

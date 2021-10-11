import { cac } from 'cac';
import { version } from '../package.json';

import { greet } from 'flashfill-core';

const cli = cac();

cli.command('').action(() => {
  greet();
});

cli.help();

cli.version(version);

cli.parse();

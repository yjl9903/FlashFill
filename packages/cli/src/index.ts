import { cac } from 'cac';
import { version } from '../package.json';

const cli = cac();

cli.help();

cli.version(version);

cli.parse();

import { $, cd } from 'zx'

await $`rimraf dist`;

await $`mkdir dist`;

await $`rescript`;

cd('src');

await $`copyfiles ./**/*.js ./**/*.d.ts ../dist`;

await $`rimraf ./**/*.js ./**/*.d.ts`;

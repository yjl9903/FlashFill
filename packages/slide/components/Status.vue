<script setup lang="ts">
import { ref } from 'vue';
import { run } from './flashfill';

// -1 -> Waiting
// 0  -> Ok
// 1  -> Fail
const status = ref(-1);

run(
  [
    ['123', '456', '789'],
    ['ABC', 'DEF', 'GHI'],
    ['abc', 'def', 'ghi']
  ],
  ['123', 'ABC', null]
)
  .then((res) => {
    if (res[2] === 'abc') {
      status.value = 0;
    } else {
      status.value = 1;
    }
  })
  .catch(() => {
    status.value = 1;
  });
</script>

<template>
  <div class="absolute top-4 right-4 flex items-center">
    <span v-if="status === -1" class="rounded-1 w-4 h-4 inline-block mr-2"></span>
    <span v-else-if="status === 0" class="rounded-1 bg-green-400 w-4 h-4 inline-block mr-2"></span>
    <span v-else-if="status === 1" class="rounded-1 bg-red-400 w-4 h-4 inline-block mr-2"></span>
    <span v-if="status === 0" class="text-gray-500">Flashfill Ok</span>
    <span v-else-if="status === 1" class="text-gray-500">Flashfill Fail</span>
  </div>
</template>

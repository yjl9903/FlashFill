<script setup lang="ts">
import { toRefs, ref, computed } from 'vue';
import { run } from './run';

const props = defineProps<{
  data: Array<{ input: string[]; output?: string }>;
  edit?: boolean;
  append?: boolean;
}>();
const { data, edit } = toRefs(props);

const inputLength = computed(() => (data.value.length > 0 ? data.value[0].input.length : 0));
const rawInput = ref(data.value.map((data) => data.input));
const rawOutput = ref(data.value.map((data) => data.output));
const output = ref(data.value.map((data) => data.output));

const running = ref(false);
const status = ref(0); // 0: wait, 1: ok, -1: error

const dirty = ref(data.value.map((data) => !!data.output));
const markDirty = (index: number) => {
  status.value = 0;
  const cur = rawOutput.value[index];
  if (!!data.value[index].output) {
    dirty.value[index] = true;
  } else if (cur !== (data.value[index].output ?? '')) {
    dirty.value[index] = true;
  } else {
    dirty.value[index] = false;
  }
};

async function start() {
  output.value = rawOutput.value.map((out, id) => (dirty.value[id] ? out : null));
  running.value = true;
  const result = await run(
    data.value.map((data) => data.input),
    output.value
  );
  if (result) {
    for (let i = 0; i < result.length; i++) {
      output.value[i] = result[i];
      rawOutput.value[i] = result[i];
    }
    running.value = false;
    status.value = 1;
  } else {
    // error
    status.value = -1;
  }
}
</script>

<template>
  <table v-if="data.length > 0" class="font-mono w-full">
    <thead>
      <tr style="border-top-width: 1px">
        <th v-for="i in inputLength">
          <span>Input {{ i }}</span>
        </th>
        <th style="border-left-width: 3px">
          <div class="flex justify-between">
            <span>
              <span>Output</span>
              <span v-if="running"><mdi-loading class="animate-spin text-light-900" /></span>
              <span v-else-if="status === 1"><mdi-check class="text-green-500" /></span>
              <span v-else-if="status === -1"><mdi-close class="text-red-500" /></span>
            </span>
            <mdi-play-circle class="ml-1 text-green-500 cursor-pointer" @click="start" />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in data">
        <td v-for="j in inputLength">
          <span v-if="!edit">{{ row.input[j - 1] }}</span>
          <input v-else-if="rawInput" type="text" v-model="rawInput[i][j - 1]" />
        </td>
        <td style="border-left-width: 3px">
          <span v-if="!running && !edit">{{ output[i] }}</span>
          <input
            v-else-if="!running && edit"
            type="text"
            v-model="rawOutput[i]"
            @change="markDirty(i)"
          />
          <span v-else>{{ output[i] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

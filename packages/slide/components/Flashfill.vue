<script setup lang="ts">
import { toRefs, watch, ref, computed } from 'vue';
import { run } from './run';

const props = defineProps<{
  data: Array<{ input: string[]; output?: string }>;
  edit?: boolean;
  append?: boolean;
  hideRun?: boolean;
  inputWidth?: string[] | number[];
  outputWidth?: string | number;
  inputLabel?: string[];
  outputLabel?: string;
}>();
const { data, edit } = toRefs(props);

const inputLength = computed(() => (data.value.length > 0 ? data.value[0].input.length : 0));
const rawInput = ref(data.value.map((data) => data.input));
const rawOutput = ref(data.value.map((data) => data.output));
const output = ref(data.value.map((data) => data.output));

const running = ref(false);
const status = ref(0); // 0: wait, 1: ok, -1: error

const dirty = ref(data.value.map((data) => !!data.output && data.output.length > 0));
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

const push = () => {
  data.value.push({ input: [''] });
  status.value = 0;
  dirty.value = data.value.map((data) => !!data.output && data.output.length > 0);
  output.value = data.value.map((data) => data.output);
  rawOutput.value = data.value.map((data) => data.output);
  rawInput.value = data.value.map((data) => data.input);
};
const pop = () => {
  data.value.pop();
  status.value = 0;
  dirty.value = data.value.map((data) => !!data.output && data.output.length > 0);
  output.value = data.value.map((data) => data.output);
  rawOutput.value = data.value.map((data) => data.output);
  rawInput.value = data.value.map((data) => data.input);
};

async function start() {
  output.value = rawOutput.value.map((out, id) => (dirty.value[id] ? out : null));
  if (output.value.every((out) => out !== null)) {
    return;
  }
  if (output.value.every((out) => out === null)) {
    return;
  }

  running.value = true;

  console.log('Run:');
  for (let i = 0; i < rawInput.value.length; i++) {
    const text = `[${rawInput.value[i].map((t) => `\`${t}\``).join(', ')}] => \`${
      output.value[i] ?? ''
    }\``;
    console.log(text);
  }

  const input = rawInput.value.map((row) => [...row]);
  console.log([...output.value]);
  const result = await run(input, [...output.value]);
  console.log(result);

  if (!!result && result.length === output.value.length) {
    console.log('Result:');
    for (let i = 0; i < rawInput.value.length; i++) {
      const text = `[${rawInput.value[i].map((t) => `\`${t}\``).join(', ')}] => \`${
        result[i] ?? ''
      }\``;
      console.log(text);
    }

    let errorFlag = true;
    for (let i = 0; i < result.length; i++) {
      output.value[i] = result[i];
      rawOutput.value[i] = result[i];
      if (!dirty.value[i]) {
        if (result[i].length > 0) {
          errorFlag = false;
        }
      }
    }
    running.value = false;
    if (errorFlag) {
      status.value = -1;
    } else {
      status.value = 1;
    }
  } else {
    // error
    running.value = false;
    status.value = -1;
  }
}
</script>

<template>
  <table v-if="data.length > 0" class="font-mono" style="table-layout: fixed">
    <thead>
      <tr style="border-top-width: 1px">
        <th v-for="i in inputLength" :width="inputWidth && inputWidth[i - 1]">
          <span v-if="inputLabel && !!inputLabel[i - 1]">{{ inputLabel[i - 1] }}</span>
          <span v-else>Input {{ i }}</span>
        </th>
        <th :style="{ borderLeftWidth: '3px', width: outputWidth ?? '20%' }">
          <div class="flex justify-between">
            <span class="inline-block w-full">
              <span v-if="!!outputLabel" class="overflow-hidden">{{ outputLabel }}</span>
              <span v-else class="overflow-hidden">Output</span>

              <span v-if="running"
                ><mdi-loading class="overflow-hidden text-sm animate-spin text-light-900"
              /></span>
              <span v-else-if="status === 1"><mdi-check class="text-green-500" /></span>
              <span v-else-if="status === -1"><mdi-close class="text-red-500" /></span>
            </span>
            <mdi-play-circle
              v-if="!hideRun"
              class="ml-1 text-green-500 cursor-pointer inline-block overflow-hidden"
              @click="start"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in data" :key="i">
        <td v-for="j in inputLength" :key="j">
          <span v-if="!edit">{{ row.input[j - 1] }}</span>
          <input v-else-if="rawInput" type="text" v-model="rawInput[i][j - 1]" class="w-full" />
        </td>
        <td style="border-left-width: 3px" :class="!dirty[i] && status === 1 && 'bg-green-100'">
          <span v-if="!running && !edit">{{ output[i] }}</span>
          <input
            v-else-if="!running && edit"
            type="text"
            :class="[!dirty[i] && status === 1 && 'bg-green-100', 'w-full']"
            v-model="rawOutput[i]"
            @change="markDirty(i)"
          />
          <span v-else>{{ output[i] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="append" class="mt-4">
    <button @click="push" class="underline !outline-transparent mr-2 hover:text-gray-500">
      Push
    </button>
    <button @click="pop" class="underline !outline-transparent hover:text-gray-500">Pop</button>
  </div>
</template>

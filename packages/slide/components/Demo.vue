<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { input: ['Jiangsu, nanjing, nju'] },
  { input: ['Hubei, wuhan, hust'] },
  { input: ['Shandong, jinan, sdu'] },
  { input: ['Hunan, changsha, csu'] }
]);

const push = () => {
  data.value.push({ input: [''] });
};

const pop = () => {
  data.value.pop();
};
</script>

<template>
  <flashfill class="mt-8" append edit :data="data" :output-width="'50%'" />
</template>

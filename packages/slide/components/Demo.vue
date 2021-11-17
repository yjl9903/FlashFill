<script setup lang="ts">
import { ref } from 'vue';

const data = ref([{ input: [''] }, { input: [''] }, { input: [''] }, { input: [''] }]);
</script>

<template>
  <flashfill class="mt-8" append edit :data="data" :output-width="'50%'" />
</template>

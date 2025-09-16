<script setup>
import { ref } from 'vue';

const prop = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <table class="border border-black">
    <thead>
      <tr>
        <th v-for="col in data.columns" :key="col" class="border border-black">
          {{ col }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="value in data.values" :key="value">
        <td v-for="item in value" :key="item" class="border border-black">
          {{ item }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>

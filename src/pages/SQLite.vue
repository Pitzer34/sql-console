<script setup>
import { ref } from 'vue';
import { Textarea, Button, Message } from 'primevue';
import db from '../composables/sql.js';
import LogTable from '../components/LogTable.vue';

const text = ref('');
const result = ref([]);

const execute = () => {
  try {
    result.value = db.exec(text.value);
  } catch (error) {
    result.value = error;
  }
};

</script>

<template>
  <div class="flex flex-col gap-y-1 h-full p-2">
    <Textarea v-model="text" size="large" class="w-full min-h-[50%] max-h-[50%]"></Textarea>
    <div class="">
      <Button @click="execute">{{ "Execute" }}</Button>
    </div>
    <template v-if="Array.isArray(result)">
      <div class="flex flex-col gap-y-2 overflow-auto">
        <div v-for="table in result" :key="table" class="self-center">
          <LogTable :data="table" />
        </div>
      </div>
    </template>
    <template v-else>
      <Message severity="error" size="large">{{ result }}</Message>
    </template>
  </div>
</template>

<style scoped></style>
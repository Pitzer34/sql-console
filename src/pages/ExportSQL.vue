<script setup>
import { ref } from 'vue';
import { Select, Button, Textarea } from 'primevue';
import { useSqlStore } from '../store/sqlStore';

const sqlStore = useSqlStore();

const tableName = ref(sqlStore.tableNames[0]);
const text = ref('');

const exportTable = () => {
  text.value = sqlStore.exportTable(tableName.value);
}

const copy = async () => {
  await navigator.clipboard.writeText(text.value);
  alert('copy success!');
}

const download = () => {
  if (!text.value) {
    alert('nothing can download!');
    return;
  }
  const blob = new Blob([text.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${tableName.value}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="flex flex-col gap-y-4 h-full p-2">
    <div class="flex">
      <Select v-model="tableName" :options="sqlStore.tableNames" placeholder="Select a Table" class="w-56 mr-4" />
      <div class="flex gap-2">
        <Button type="submit" @click="exportTable()">{{ "Export" }}</Button>
      </div>
    </div>
    <div class="flex-1 flex flex-col p-2 border-2 rounded-md ">
      <div class="flex gap-2 flex-row-reverse m-2">
        <Button label="Copy" @click="copy()" />
        <Button label="Download" @click="download()" />
      </div>
      <Textarea v-model="text" class="flex-1 w-full bg-neutral-700 text-neutral-50 overflow-auto" readonly />
    </div>
  </div>
</template>

<style scoped></style>
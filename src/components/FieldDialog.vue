<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';

const emptyFieldInfo = {
  fieldCode: '',
  fieldName: '',
  type: '',
  length: '',
  primaryKey: false,
  allowNull: false,
  default: ''
};

const fieldInfo = ref({ ...emptyFieldInfo });

const dialogVisible = defineModel('visible', {
  type: Boolean,
  default: false,
});

const typeOptions = [
  'char', 'varchar', 'nvarchar', 'int', 'decimal', 'date', 'boolean'
]

const cancel = () => {
  fieldInfo.value = { ...emptyFieldInfo };
  dialogVisible.value = false;
}

const emit = defineEmits(['submit']);

const submitHandler = () => {
  emit('submit', fieldInfo.value);
  fieldInfo.value = { ...emptyFieldInfo };
  dialogVisible.value = false;
}

</script>

<template>
  <Dialog v-model:visible="dialogVisible" modal header="Add new template field" class="w-[25rem]">
    <div class="flex items-center gap-4 mb-4">
      <label for="fieldCode" class="font-semibold w-24">Field Code</label>
      <InputText id="fieldCode" class="flex-auto" size="small" v-model="fieldInfo.fieldCode" />
    </div>
    <!-- <div class="flex items-center gap-4 mb-4">
      <label for="fieldName" class="font-semibold w-24">Field Name</label>
      <InputText id="fieldName" class="flex-auto" size="small" v-model="fieldInfo.fieldName" />
    </div> -->
    <div class="flex items-center gap-4 mb-4">
      <label for="type" class="font-semibold w-24">Type</label>
      <Select v-model="fieldInfo.type" :options="typeOptions" class="flex-auto" size="small"
        placeholder="Select a Type"></Select>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="length" class="font-semibold w-24">Length</label>
      <InputText id="length" class="flex-auto" size="small" placeholder="Ex: 25,6 or max or 7"
        v-model="fieldInfo.length" />
    </div>
    <div class="flex gap-4 mb-4">
      <div class="flex-1 flex items-center gap-4 mb-4">
        <label for="primaryKey" class="font-semibold">Primary key</label>
        <Checkbox id="primaryKey" size="large" v-model="fieldInfo.primaryKey" binary />
      </div>
      <div class="flex-1 flex items-center gap-4 mb-4">
        <label for="allowNull" class="font-semibold">Allow null</label>
        <Checkbox id="allowNull" size="large" v-model="fieldInfo.allowNull" binary />
      </div>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="default" class="font-semibold w-24">Default</label>
      <InputText id="default" class="flex-auto" size="small" v-model="fieldInfo.default" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="cancel"></Button>
      <Button type="button" label="Save" @click="submitHandler"></Button>
    </div>
  </Dialog>
</template>

<style scoped></style>
<script setup>
import { ref } from 'vue';
import { Dialog, InputText, Button, Select, Checkbox, useToast, Toast, Message } from 'primevue';
import { Form } from '@primevue/forms';

//* defineModel
const dialogVisible = defineModel('visible', {
  type: Boolean,
  default: false,
});

//* primevue
const toast = useToast();

const typeOptions = ['char', 'varchar', 'nvarchar', 'int', 'decimal', 'date', 'boolean'];
const initialValues = ref({
  fieldCode: '',
  type: '',
  length: '',
  primaryKey: false,
  allowNull: false,
  defaultValue: ''
});

const resolver = ({ values }) => {
  const errors = {};
  if (!values.fieldCode) {
    errors.fieldCode = [{ message: 'Field Code is required.' }];
  }
  if (!values.type) {
    errors.type = [{ message: 'Type is required.' }];
  }
  if (!values.length) {
    errors.length = [{ message: 'Length is required.' }];
  }
  return { values, errors };
}

const cancel = () => {
  initialValues.value = initialValues.value;
  dialogVisible.value = false;
}

const emit = defineEmits(['submit']);

const onFormSubmit = (data) => {
  if (data.valid) {
    toast.add({
      severity: 'success',
      summary: 'Field is created.',
      life: 3000
    });
    emit('submit', data.values);
    dialogVisible.value = false;
  }
}

</script>

<template>
  <Dialog v-model:visible="dialogVisible" modal header="New template field" class="w-[25rem]">
    <Toast />
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-2">
      <div class="grid grid-cols-10">
        <label for="fieldCode" class="col-span-3 font-semibold self-center">Field Code</label>
        <InputText type="text" id="fieldCode" name="fieldCode" class="col-span-7" size="small" />
        <span class="col-span-3"></span>
        <Message v-if="$form.fieldCode?.invalid" severity="error" size="small" variant="simple" class="col-span-7">
          {{ $form.fieldCode.error?.message }}
        </Message>
      </div>
      <div class="grid grid-cols-10">
        <label for="type" class="col-span-3 font-semibold self-center">Type</label>
        <Select id="type" name="type" :options="typeOptions" class="col-span-7" size="small"
          placeholder="Select a Type"></Select>
        <span class="col-span-3"></span>
        <Message v-if="$form.type?.invalid" severity="error" size="small" variant="simple" class="col-span-7">
          {{ $form.type.error?.message }}
        </Message>
      </div>
      <div class="grid grid-cols-10">
        <label for="fieldCode" class="col-span-3 font-semibold self-center">Length</label>
        <InputText type="number" id="length" name="length" class="col-span-7" size="small"
          placeholder="Ex: 25,6 or max or 7" />
        <span class="col-span-3"></span>
        <Message v-if="$form.length?.invalid" severity="error" size="small" variant="simple" class="col-span-7">
          {{ $form.length.error?.message }}
        </Message>
      </div>
      <div class="flex gap-4">
        <div class="flex-1 flex items-center gap-4">
          <label for="primaryKey" class="font-semibold">Primary key</label>
          <Checkbox id="primaryKey" name="primaryKey" size="large" binary />
        </div>
        <div class="flex-1 flex items-center gap-4">
          <label for="allowNull" class="font-semibold">Allow null</label>
          <Checkbox id="allowNull" name="allowNull" size="large" binary />
        </div>
      </div>
      <div class="grid grid-cols-10">
        <label for="defaultValue" class="col-span-3 font-semibold self-center">DefaultValue</label>
        <InputText type="text" id="defaultValue" name="defaultValue" class="col-span-7" size="small" />
      </div>
      <div class="flex justify-end gap-2">
        <Button label="Cancel" severity="secondary" @click="cancel"></Button>
        <Button type="submit" label="Save"></Button>
      </div>
    </Form>
  </Dialog>
</template>

<style scoped></style>
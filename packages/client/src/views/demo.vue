<template>
    <a-form
      ref="formRef"
      :model="formState"
    >
      <a-form-item label="Activity name" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="Activity zone" name="region">
        <a-select v-model:value="formState.region" placeholder="please select your zone">
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Activity time" required name="date1">
        <a-input v-model:value="formState.date1" />
       
      </a-form-item>
  
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item>
    </a-form>
  </template>
  <script lang="ts" setup>
  import { reactive, ref, toRaw } from 'vue';
  import type { UnwrapRef } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  
  interface FormState {
    name: string;
    region: string | undefined;
    delivery: boolean;
    type: string[];
    resource: string;
    desc: string;
  }
  const formRef = ref();
  const labelCol = { span: 5 };
  const wrapperCol = { span: 13 };
  const formState = ref();
  const rules: Record<string, Rule[]> = {
    name: [
      { required: true, message: 'Please input Activity name', trigger: 'change' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
    date1: [{ required: true, message: 'Please pick a date', trigger: 'change', type: 'object' }],
    type: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change',
      },
    ],
    resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
    desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
  };
  const onSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log('values', formState, toRaw(formState));
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const resetForm = () => {
    formRef.value.resetFields();
  };
  </script>
  
  
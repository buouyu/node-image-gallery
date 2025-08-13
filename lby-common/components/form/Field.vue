<template>
  <!-- <view class=""> -->
  <template v-if="field.fieldType == 'input'">
    <up-input
      border="bottom"
      :placeholder="field.placeholder || '请输入' + field.label"
      v-model="model"
      :type="field.type"
    ></up-input>
  </template>
  <template v-else-if="field.fieldType == 'code'">
    <Code v-model="model" />
  </template>
  <template v-else-if="field.fieldType == 'single-radio'">
    <up-checkbox
      :label="field.text"
      name="agree"
      usedAlone
      shape="circle"
      v-model:checked="model"
    >
    </up-checkbox>
  </template>
  <template v-else-if="field.fieldType == 'slot'">
    <slot :name="field.slotName"></slot>
  </template>
  <template v-else-if="field.fieldType == 'upload'">
    <Upload />
  </template>
  <template v-else> </template>
  <!-- </view> -->
</template>

<script setup>
import { ref, defineProps, defineEmits, defineModel } from 'vue'
import Code from './Code.vue'
import Upload from './Upload/index.vue'
const { field } = defineProps(['field'])
const model = defineModel()
</script>

<style scoped lang="scss"></style>

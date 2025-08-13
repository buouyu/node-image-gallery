<template>
  <up-popup class="my-popup-wrapper"  :safeAreaInsetBottom="false"  v-bind="$attrs" :customStyle="{
    padding: '1rem',
    width: '85vw',
  }" round="10" zInde="0" :show="isShow":mode="mode" @close="close" @open="open">
    <view class="text-lg text-center pb-1">
      {{ title }}
    </view>
    <view class="content">
      <slot></slot>
    </view>
    <view v-if="cancelText || okText" class="flex mx-1 mt-1">
      <up-button class="mx-2" v-if="cancelText" @click="close" :text="cancelText"></up-button>
      <up-button class="mx-2" v-if="okText" @click="confirm" type="primary" :text="okText"></up-button>
    </view>
  </up-popup>
</template>
<script setup name="Popup">
import { ref, defineModel } from 'vue'
const isShow = defineModel()
const { mode, title, cancelText, okText } = defineProps({
  mode: {
    type: String,
    default: 'center'
  },
  title: {
    type: String,
  },
  cancelText: {
    type: String,
  },
  okText: {
    type: String
  }
})
// bottom
const emit = defineEmits(['confirm', 'close'])
const close = () => {
  emit('close')
  isShow.value = false
}
const confirm = () => {
  emit('confirm')
}
const open = () => { }
</script>

<style scoped lang="scss">
.content {
  flex: 1;
  overflow-y: auto;
}

.my-popup-wrapper {
  display: flex;
  flex-direction: column;
}
</style>

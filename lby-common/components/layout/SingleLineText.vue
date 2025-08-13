<template>
  <text class="text-container" ref="textContainer">
    {{ displayText }}
  </text>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
const props = defineProps(['parentValue'])
const originalText = ref('这是一段可能会超过一行显示的很长很长的文本内容')
const displayText = ref('')
onMounted(() => {
  calculateDisplayText()
})
const calculateDisplayText = async () => {
  const query = uni.createSelectorQuery().in(this);
  query.select('.text-container').boundingClientRect((rect) => {
    if (rect) {
      const containerWidth = rect.width;
      console.log('containerWidth', containerWidth)
      // 粗略估算每行可容纳的字符数
      const charWidth = 14 * 0.6; // 假设每个字符平均宽度为字体大小的 0.6 倍
      const maxChars = Math.floor(containerWidth / charWidth);
      displayText.value = originalText.value.slice(0, maxChars);
    }
  }).exec();
}
</script>

<style scoped lang="scss"></style>
<template>
    <fileMangePage />
</template>

<script setup>
import { rqs, formatTime } from "lby-common";
import { computed, onMounted, watch } from "vue";
import fileMangePage from '@/pages/index/fileMangePage.vue'
// const init = async () => {
//   // wxlogin()
//   const res = await rqs.get('/file_list')
//   console.log('res-----14', res)
// }
// onMounted(() => {
//   init()
// })
</script>

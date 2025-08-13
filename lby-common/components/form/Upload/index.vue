<template>
  <up-upload
    :fileList="fileList"
    @afterRead="afterRead"
    @delete="deletePic"
    name="1"
    accept="image"
    multiple
    :maxCount="10"
    :previewFullImage="true"
    :uploadText="uploadText"
  ></up-upload>
  <!-- #ifdef MP-WEIXIN -->
  <canvas
    type="2d"
    id="upload-canvas"
    class="uploadCanvas"
    :style="{
      width: width + 'px',
      height: height + 'px',
      position: 'absolute',
      'z-index': '-999',
      left: '-1000000px',
    }"
  ></canvas>
  <!-- #endif -->
  <!-- <canvas
    style="width: 300px; height: 200px"
    canvas-id="upload-canvas"
    id="upload-canvas"
  ></canvas> -->
  <!-- #ifdef H5 -->
  <canvas
    canvas-id="upload-canvas"
    id="upload-canvas"
    class="uploadCanvas"
    :style="{
      width: canvasConfig.width + 'px',
      height: canvasConfig.height + 'px',
    }"
  ></canvas>
  <!-- #endif -->
</template>

<script setup>
// position: 'absolute',
// 'z-index': '-999',
// left: '-1000000px',
import { ref, getCurrentInstance, defineProps } from 'vue'
import { addWatermark, canvasConfig } from './upload.js'
import { uploadFile } from '../../../services/request'
import { generateUUID } from '../../../utils/utilFns'

const fileList = ref([])
const props = defineProps(['uploadText'])

// 删除图片
const deletePic = (event) => {
  fileList.value.splice(event.index, 1)
}

// 新增图片
const afterRead = async (event) => {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  let lists = [].concat(event.file)
  lists.map((item) => {
    fileList.value.push({
      ...item,
      status: 'uploading',
      message: '上传中',
    })
  })
  console.log('lists', lists)
  const json_object = {
    type: 1,
    identify: false,
    info_type: 26,
    info_key: generateUUID(),
  }
  const result = []
  for (let i = 0; i < lists.length; i++) {
    const item = lists[i]
    // const path = await addWatermark(item.url)
    // console.log('resaaa', path)
    const [err, res] = await uploadFile(item.file, json_object)
    result.push(res)
  }
  fileList.value = result
}
</script>
<style scoped lang="scss">
.u-upload {
  flex: none;
}
</style>

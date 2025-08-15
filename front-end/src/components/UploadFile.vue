<template>
        <view>
                <up-upload :previewFullImage="true" class="" name="3" :fileList="fileList" @afterRead="afterRead"
                        @delete="deletePic" @clickPreview="clickPreview" multiple :maxCount="9"></up-upload>
        </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { uploadFile, rqs } from "lby-common";
const props = defineProps({
        // 1 标记集合 2 标记点 3意见
        type: {
                type: Number,
        },
        id: {
                type: Number,
        },
});
const emits = defineEmits([]);
const fileList = ref([]);
const deleteList = ref([]);
const deletePic = async (event) => {
        const item = uni.gb.deepCopy(fileList.value[event.index]);
        if (item.id) deleteList.value.push(item);
        fileList.value.splice(event.index, 1);
};

const afterRead = async (fileData) => {
        // #ifdef MP-WEIXIN
        // const systemInfo = wx.getSystemInfoSync();
        // if (systemInfo.platform === 'windows' || systemInfo.platform === 'mac') {
        //         uni.gb.showToast('请在手机端上传图片')
        //         return
        // }
        // #endif
        fileList.value.push(...fileData.file);
};
const clickPreview = async (url, lists, name) => {
        console.log('lists-----45', url, lists, name)
}
// const previewImage = async (url, lists, name) => {
//         uni.previewImage({
//                 urls: fileList.value.map((it) => it.url),
//                 showmenu: true,
//                 indicator: true,
//                 indicator: 'default',
//         });
// };
const init = async () => {

};
onMounted(() => {
        init();
});

const save = async (path, cb) => {
        // 父级调用
        try {
                if (!fileList.value.length && !deleteList.value.length) return;
                const filterList = fileList.value.filter((it) => !it.id)
                const total = filterList.length * 100
                const curArr = new Array(filterList.length).fill(0)
                const addlist = filterList
                        .map((it, i) => {
                                const params = {
                                        path: path + '/' + it.name
                                }
                                return uploadFile(it.url, params, {
                                        progress(num) {
                                                curArr[i] = num
                                                const curNum = curArr.reduce((total, current) => total + current, 0);
                                                const newProgress = Math.ceil(curNum / total * 100)
                                                cb && cb(newProgress)
                                        }
                                })
                        });
                // if (deleteList.value.length) {
                //         rqs.post("/destroy_image", { id: deleteList.value.map((it) => it.id) })
                // }
                return await Promise.allSettled(addlist)
                // console.log('addlist-----76', addlist)
                // for(const it of addlist){
                //       await  uploadFile(it.url)
                // }
                // return addlist
        } catch (error) {
                console.log('error-----100', error)
                return
        }

};
defineExpose({
        save,
});
</script>
<style lang="scss" scoped></style>

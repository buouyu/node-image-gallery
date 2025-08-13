<template>
    <view class="page">
        <ListPage :getList="getList" :total="total" :current="current" :list="list" :isLoading="isLoading">
            <template #header>
                <!-- <view>
                    文件管理
                </view> -->
                <view class="breadcrumb">
                    <view @click="handleClickDirector(index, crumb)" class="crumb"
                        v-for="(crumb, index) in renderDirectorys" :key="index">
                        <text class="crumb-text">{{ crumb }}</text>
                        <text v-if="index < renderDirectorys.length - 1" class="separator">/</text>
                    </view>
                </view>
                <view>
                    <view @click="handleBack">返回上一级</view>
                    <view @click="handleNewDirectory">+新建文件夹</view>
                    <view @click="handleClickUpload">上传文件</view>
                </view>
                <Popup @confirm="handleUplaodConfirm" v-model="isShowUplaodPopup" okText="确认" cancelText="取消"
                    title="上传文件">
                    <view class=" p-2">
                        <UploadFile ref="uplaodRef" />
                    </view>
                </Popup>
            </template>
            <template #item="{ item }">
                <view class="file-item" @click="handleClickItem(item)">
                    <view class="icon" :class="item.type"></view>
                    <view class="info">
                        <text class="name">{{ item.name }}</text>
                        <text class="meta">
                            {{ item.type === 'directory' ? '文件夹' : formatSize(item.size) }} · {{
                                formatTime(item.modifiedTime, 'YYYY-MM-DD hh:mm') }}
                        </text>
                    </view>
                    <view @click.stop="handleDelete(item)" class="text-red">
                        删除
                    </view>
                </view>
            </template>
        </ListPage>
    </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ListPage from "lby-common/components/layout/ListPage.vue";
import Popup from "lby-common/components/layout/Popup.vue";
import UploadFile from '@/components/UploadFile.vue'
import { useList, rqs, formatTime } from 'lby-common';
// 这里是静态 mock 数据（仅 UI 用）
// const mockFiles = [
//     { name: "文档", type: "directory", size: null, modifiedTime: "2025-08-13 10:20" },
//     { name: "photo.jpg", type: "file", size: 2456789, modifiedTime: "2025-08-11 14:30" },
//     { name: "music.mp3", type: "file", size: 5890234, modifiedTime: "2025-08-10 09:15" },
//     { name: "项目文件", type: "directory", size: null, modifiedTime: "2025-08-09 20:05" }
// ];

const currentDirectorys = ref([])
const isShowUplaodPopup = ref(false)
const uplaodRef = ref(null)
const renderDirectorys = computed(() => {
    return ['root', ...currentDirectorys.value]
})
const currentPath = computed(() => {
    return '/' + currentDirectorys.value.join('/')
})
const { getList, total, current, list, isLoading, saveItem } = useList(
    [currentPath],
    async (page) => {
        const res = await rqs.get('/file_list', { path: currentPath.value })
        console.log('res-----14', res)
        // return mockFiles
        return res
    }
);
const handleUplaodConfirm = async () => {
    await uplaodRef.value.save(formatEndpath(currentPath.value))
    isShowUplaodPopup.value = false

}
const handleClickUpload = async () => {
    isShowUplaodPopup.value = true
}

const handleClickDirector = async (index) => {
    index = index - 1
    if (~index) {
        console.log('index-----65', index)
        currentDirectorys.value.splice(index + 1)
    } else {
        currentDirectorys.value = []
    }
}
const handleBack = async () => {
    handleClickDirector(currentDirectorys.value.length - 1)
}

const handleClickItem = async (item) => {
    if (item.type == 'directory') {
        currentDirectorys.value.push(item.name)
    } else {

    }
}

const formatEndpath = (str) => {
    if (str.endsWith("/")) {
        str = str.slice(0, -1); // 去掉最后一个字符
    }
    return str
}

const handleDelete = async (item) => {
    const type = item.type == 'directory' ? '文件夹' : '文件'
    await uni.gb.showModal({
        content: `是否要删除该${type}?`
    })
    const path = formatEndpath(currentPath.value) + '/' + item.name
    const [err, res] = await rqs.delete('/delete_file', { path })
    if (err) {
        return uni.gb.showErr(err.message)
    }
    getList()
}

const handleNewDirectory = async () => {
    uni.showModal({
        title: `文件夹`,
        editable: true,
        cancelText: '取消',
        confirmText: '确认',
        placeholderText: '请输入文件夹名称',
        async success(res) {
            if (!res.content) {
                uni.gb.showToast('文件夹名称不能为空')
                return
            }
            const path = formatEndpath(currentPath.value) + '/' + res.content
            const [err, result] = await rqs.post('/makedir', { path })
            if (err) return uni.gb.showErr(err.message)
            getList()
        }
    })
}


// 文件大小格式化
const formatSize = (bytes) => {
    if (bytes == null) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
};
</script>

<style lang="scss" scoped>
.breadcrumb {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .crumb {
        display: flex;
        align-items: center;

        .crumb-text {
            background: rgba(255, 255, 255, 0.2);
            padding: 6rpx 14rpx;
            border-radius: 8rpx;
            transition: background 0.2s;
        }

        &:hover .crumb-text {
            background: rgba(255, 255, 255, 0.35);
        }

        .separator {
            margin: 0 10rpx;
        }
    }
}

.file-item {
    display: flex;
    align-items: center;
    // background: #fff;
    // border-radius: 12rpx;
    // padding: 20rpx;
    // margin-bottom: 20rpx;
    // box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;

    &:active {
        transform: scale(0.98);
    }

    .icon {
        width: 60rpx;
        height: 60rpx;
        margin-right: 20rpx;
        background-size: cover;

        &.directory {
            background-image: url('https://img.icons8.com/fluency/96/folder-invoices.png');
        }

        &.file {
            background-image: url('https://img.icons8.com/fluency/96/document.png');
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        flex: 1;

        .name {
            font-size: 30rpx;
            font-weight: 500;
            color: #333;
            margin-bottom: 6rpx;
        }

        .meta {
            font-size: 24rpx;
            color: #999;
        }
    }
}
</style>

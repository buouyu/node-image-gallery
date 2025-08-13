<template>
  <view class="page">
    <ListPage
      :getList="getList"
      :total="total"
      :current="current"
      :list="list"
      :isLoading="isLoading"
    >
      <template #header>
        <!-- <view>
                    文件管理
                </view> -->
        <!-- <view class="breadcrumb">
          <view
            @click="handleClickDirector(index, crumb)"
            class="crumb"
            v-for="(crumb, index) in renderDirectorys"
            :key="index"
          >
            <text class="crumb-text">{{ crumb }}</text>
            <text v-if="index < renderDirectorys.length - 1" class="separator">/</text>
          </view>
        </view>
        <view>
          <view @click="handleBack">返回上一级</view>
          <view @click="handleNewDirectory">+新建文件夹</view>
          <view @click="handleClickUpload">上传文件</view>
        </view> -->
        <Popup
          @confirm="handleUplaodConfirm"
          v-model="isShowUplaodPopup"
          okText="确认"
          cancelText="取消"
          title="上传文件"
        >
          <view class="p-2">
            <UploadFile ref="uplaodRef" />
          </view>
        </Popup>
        <Popup v-model="isShowFileDetail" cancelText="关闭" title="文件详情">
          <view class="file-detail-card">
            <view @click="handleViewImage(activeItem.fullPath)" class="detail-header">
              <image
                class="file-icon"
                :src="activeItem.url || defaultFileUrl"
                mode="aspectFit"
              />
            </view>

            <view class="detail-body">
              <view class="detail-row">
                <text class="label">文件名称：</text>
                <text class="value font-bold">{{ activeItem.name }}</text>
              </view>
              <view class="detail-row">
                <text class="label">大小：</text>
                <text class="value">{{ formatSize(activeItem.size) }}</text>
              </view>
              <view class="detail-row">
                <text class="label">最后修改：</text>
                <text class="value">{{
                  formatTime(activeItem.modifiedTime, "YYYY-MM-DD hh:mm")
                }}</text>
              </view>
              <view @click="handleCopy(activeItem.path)" class="detail-row">
                <text class="label">路径：</text>
                <text class="value">{{ activeItem.path }}</text>
              </view>
              <view @click="handleCopy(activeItem.fullPath)" class="detail-row">
                <text class="label">地址：</text>
                <text class="value">{{ activeItem.fullPath }}</text>
              </view>
            </view>

            <!-- <view class="detail-actions">
              <button class="btn open-btn">打开文件</button>
              <button class="btn download-btn">下载</button>
              <button class="btn delete-btn">删除</button>
            </view> -->
          </view>
        </Popup>
        <view class="file-manager-header">
          <!-- 路径导航 -->
          <view class="path-bar">
            <text
              @click="handleClickDirector(index, segment)"
              v-for="(segment, index) in renderDirectorys"
              :key="index"
              class="path-segment"
            >
              {{ segment }}
              <text v-if="index < renderDirectorys.length - 1" class="path-separator">
                /</text
              >
            </text>
          </view>

          <!-- 操作按钮区 -->
          <view class="action-buttons">
            <button class="btn back-btn" @click="handleBack">返回上一级</button>
            <button class="btn create-btn" @click="handleNewDirectory">
              + 新建文件夹
            </button>
            <button class="btn upload-btn" @click="handleClickUpload">上传文件</button>
          </view>
        </view>
      </template>
      <template #item="{ item }">
        <view class="file-item" @click="handleClickItem(item)">
          <view class="icon" :class="item.type">
            <image v-if="item.url" class="image" :src="item.url" mode="scaleToFill" />
          </view>
          <view class="info">
            <text class="name">{{ item.name }}</text>
            <text class="meta">
              {{ item.type === "directory" ? "文件夹" : formatSize(item.size) }} ·
              {{ formatTime(item.modifiedTime, "YYYY-MM-DD hh:mm") }}
            </text>
          </view>
          <view @click.stop="handleDelete(item)" class="text-red nowrap pl-1">
            删除
          </view>
        </view>
      </template>
    </ListPage>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ListPage from "lby-common/components/layout/ListPage.vue";
import Popup from "lby-common/components/layout/Popup.vue";
import UploadFile from "@/components/UploadFile.vue";
import { useList, rqs, formatTime } from "lby-common";
// 这里是静态 mock 数据（仅 UI 用）
// const mockFiles = [
//     { name: "文档", type: "directory", size: null, modifiedTime: "2025-08-13 10:20" },
//     { name: "photo.jpg", type: "file", size: 2456789, modifiedTime: "2025-08-11 14:30" },
//     { name: "music.mp3", type: "file", size: 5890234, modifiedTime: "2025-08-10 09:15" },
//     { name: "项目文件", type: "directory", size: null, modifiedTime: "2025-08-09 20:05" }
// ];
const defaultFileUrl = "https://img.icons8.com/fluency/96/document.png";
const baseUrl = "http://localhost:3000/files";
const currentDirectorys = ref([]);
const isShowUplaodPopup = ref(false);
const uplaodRef = ref(null);
const renderDirectorys = computed(() => {
  return ["root", ...currentDirectorys.value];
});
const currentPath = computed(() => {
  if (currentDirectorys.value.length == 0) {
    return "";
  }
  return "/" + currentDirectorys.value.join("/");
});
function isImageFile(fileName) {
  return /\.(jpg|png|gif)$/i.test(fileName);
}
const { getList, total, current, list, isLoading, saveItem } = useList(
  [currentPath],
  async (page) => {
    const res = await rqs.get("/file_list", { path: currentPath.value });
    console.log("res-----14", res);
    res.map((it) => {
      if (it.type == "file") {
        it.fullPath = baseUrl + currentPath.value + "/" + it.name;
        if (isImageFile(it.name)) {
          it.url = it.fullPath;
        }
        it.path = currentPath.value + "/" + it.name;
      }
      return it;
    });
    // return mockFiles
    return res;
  }
);
const handleUplaodConfirm = async () => {
  await uplaodRef.value.save(formatEndpath(currentPath.value));
  getList();
  uni.gb.showToast("上传成功");
  isShowUplaodPopup.value = false;
};
const handleClickUpload = async () => {
  isShowUplaodPopup.value = true;
};

const handleClickDirector = async (index) => {
  index = index - 1;
  if (~index) {
    console.log("index-----65", index);
    currentDirectorys.value.splice(index + 1);
  } else {
    currentDirectorys.value = [];
  }
};
const handleBack = async () => {
  handleClickDirector(currentDirectorys.value.length - 1);
};

const isShowFileDetail = ref(false);
const activeItem = ref(null);
const handleClickItem = async (item) => {
  if (item.type == "directory") {
    currentDirectorys.value.push(item.name);
  } else {
    activeItem.value = item;
    isShowFileDetail.value = true;
  }
};

const formatEndpath = (str) => {
  if (str.endsWith("/")) {
    str = str.slice(0, -1); // 去掉最后一个字符
  }
  return str;
};

const handleDelete = async (item) => {
  const type = item.type == "directory" ? "文件夹" : "文件";
  await uni.gb.showModal({
    content: `是否要删除该${type}?`,
  });
  const path = formatEndpath(currentPath.value) + "/" + item.name;
  const [err, res] = await rqs.delete("/delete_file", { path });
  if (err) {
    return uni.gb.showErr(err.message);
  }
  getList();
};

const handleNewDirectory = async () => {
  uni.showModal({
    title: `文件夹`,
    editable: true,
    cancelText: "取消",
    confirmText: "确认",
    placeholderText: "请输入文件夹名称",
    async success(res) {
      if (!res.content) {
        uni.gb.showToast("文件夹名称不能为空");
        return;
      }
      const path = formatEndpath(currentPath.value) + "/" + res.content;
      const [err, result] = await rqs.post("/makedir", { path });
      if (err) return uni.gb.showErr(err.message);
      getList();
    },
  });
};

const handleCopy = async (data) => {
  uni.setClipboardData({
    data: data,
    success: () => {
      uni.showToast({
        title: "复制成功",
        icon: "success",
      });
    },
  });
};

const handleViewImage = async (url) => {
  uni.previewImage({
    urls: [url], // 图片数组
    current: url, // 当前显示的图片
  });
};

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
.file-detail-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin: 0 16px;
  font-size: 14px;
  color: #333;

  .detail-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    .file-icon {
      width: 80%;
      //   height: 48px;
      border-radius: 8px;
      margin-right: 12px;
    }
  }

  .detail-body {
    border-top: 1px solid #eee;
    padding-top: 12px;
    margin-top: 8px;

    .detail-row {
      display: flex;
      margin-bottom: 6px;

      .label {
        width: 90px;
        color: #666;
      }
      .value {
        flex: 1;
        color: #333;
        word-break: break-all;
      }
    }
  }

  .detail-actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;

    .btn {
      flex: 1;
      padding: 8px 0;
      border-radius: 6px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .open-btn {
      background-color: #4cafef;
      color: white;
      &:hover {
        background-color: #339be0;
      }
    }
    .download-btn {
      background-color: #ffd966;
      color: #664d00;
      &:hover {
        background-color: #ffcc33;
      }
    }
    .delete-btn {
      background-color: #f87171;
      color: white;
      &:hover {
        background-color: #ef4444;
      }
    }
  }
}
.file-manager-header {
  background: #f8f9fb;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;

  .path-bar {
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
    display: flex;
    flex-wrap: wrap;

    .path-segment {
      cursor: pointer;
      color: #007aff;
      transition: color 0.2s ease;

      &:hover {
        color: #0051c3;
      }
    }

    .path-separator {
      margin: 0 6px;
      color: #999;
    }
  }

  .action-buttons {
    display: flex;
    gap: 10px;

    .btn {
      flex: 1;
      padding: 8px 12px;
      border-radius: 6px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .back-btn {
      background-color: #f5f5f5;
      color: #333;

      &:hover {
        background-color: #e8e8e8;
      }
    }

    .create-btn {
      background-color: #ffd966;
      color: #664d00;

      &:hover {
        background-color: #ffcc33;
      }
    }

    .upload-btn {
      background-color: #4cafef;
      color: white;

      &:hover {
        background-color: #339be0;
      }
    }
  }
}
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
    .image {
      height: 100%;
      width: 100%;
    }
    &.directory {
      background-image: url("https://img.icons8.com/fluency/96/folder-invoices.png");
    }

    &.file {
      background-image: url("https://img.icons8.com/fluency/96/document.png");
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
      overflow-wrap: break-word;
      word-break: break-all;
    }

    .meta {
      font-size: 24rpx;
      color: #999;
    }
  }
}
::v-deep #u-a-p > div {
  z-index: 999999;
}
</style>

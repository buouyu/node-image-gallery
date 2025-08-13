<template>
  <view class="file-list-page">
    <!-- 页头 -->
    <view class="header">
      <text class="title">文件管理</text>

      <!-- 面包屑导航 -->
      <view class="breadcrumb">
        <view 
          class="crumb" 
          v-for="(crumb, index) in breadcrumbs" 
          :key="index"
        >
          <text class="crumb-text">{{ crumb }}</text>
          <text v-if="index < breadcrumbs.length - 1" class="separator">›</text>
        </view>
      </view>
    </view>

    <!-- 文件列表 -->
    <scroll-view scroll-y class="file-list">
      <view class="file-item" v-for="(item, index) in mockFiles" :key="index">
        <!-- 文件/文件夹图标 -->
        <view class="icon" :class="item.type"></view>

        <!-- 文件信息 -->
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <text class="meta">
            {{ item.type === 'directory' ? '文件夹' : formatSize(item.size) }} · {{ item.modifiedTime }}
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
// 面包屑静态数据
const breadcrumbs = ["根目录", "文档", "工作", "设计图"];

// 静态文件数据
const mockFiles = [
  { name: "资料", type: "directory", size: null, modifiedTime: "2025-08-13 10:20" },
  { name: "photo.jpg", type: "file", size: 2456789, modifiedTime: "2025-08-11 14:30" },
  { name: "music.mp3", type: "file", size: 5890234, modifiedTime: "2025-08-10 09:15" },
  { name: "项目文件", type: "directory", size: null, modifiedTime: "2025-08-09 20:05" }
];

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
.file-list-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fb;

  .header {
    background: #4a90e2;
    padding: 20rpx 30rpx 30rpx;
    color: #fff;
    font-size: 36rpx;
    font-weight: bold;
    box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.1);

    .title {
      display: block;
      margin-bottom: 12rpx;
    }

    .breadcrumb {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 26rpx;

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
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }

  .file-list {
    flex: 1;
    padding: 20rpx;

    .file-item {
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 12rpx;
      padding: 20rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
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
  }
}
</style>

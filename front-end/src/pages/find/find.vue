<template>
  <view class="file-detail-card">
    <view class="detail-header">
      <image class="file-icon" src="/static/icons/file.png" mode="aspectFit" />
      <view class="file-info">
        <text class="file-name">example.png</text>
        <text class="file-type">图片文件</text>
      </view>
    </view>

    <view class="detail-body">
      <view class="detail-row">
        <text class="label">大小：</text>
        <text class="value">2.34 MB</text>
      </view>
      <view class="detail-row">
        <text class="label">类型：</text>
        <text class="value">PNG 图片</text>
      </view>
      <view class="detail-row">
        <text class="label">创建时间：</text>
        <text class="value">2025-08-10 14:32</text>
      </view>
      <view class="detail-row">
        <text class="label">最后修改：</text>
        <text class="value">2025-08-12 19:20</text>
      </view>
      <view class="detail-row">
        <text class="label">路径：</text>
        <text class="value">/root/aaaa/example.png</text>
      </view>
    </view>

    <view class="detail-actions">
      <button class="btn open-btn">打开文件</button>
      <button class="btn download-btn">下载</button>
      <button class="btn delete-btn">删除</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.file-detail-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  padding: 16px;
  margin: 16px;
  font-size: 14px;
  color: #333;

  .detail-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    .file-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      background: #f0f0f0;
      margin-right: 12px;
    }

    .file-info {
      display: flex;
      flex-direction: column;

      .file-name {
        font-weight: bold;
        font-size: 16px;
      }
      .file-type {
        font-size: 12px;
        color: #888;
      }
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
      &:hover { background-color: #339be0; }
    }
    .download-btn {
      background-color: #ffd966;
      color: #664d00;
      &:hover { background-color: #ffcc33; }
    }
    .delete-btn {
      background-color: #f87171;
      color: white;
      &:hover { background-color: #ef4444; }
    }
  }
}
</style>

<template>
  <view class="circle-progress">
    <svg viewBox="0 0 120 120" class="circle-svg">
      <!-- 渐变定义 -->
      <defs>
        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd6e8" /> <!-- 浅粉 -->
          <stop offset="100%" stop-color="#ff4f9a" /> <!-- 深粉 -->
        </linearGradient>
      </defs>

      <!-- 背景圆 -->
      <circle
        class="circle-bg"
        cx="60"
        cy="60"
        r="54"
      />

      <!-- 进度圆 -->
      <circle
        class="circle-bar"
        :style="{ strokeDashoffset: dashOffset }"
        cx="60"
        cy="60"
        r="54"
        stroke="url(#pinkGradient)"
      />
    </svg>

    <view class="circle-text">
      <text>{{ progress }}%</text>
      <view class="bubble"></view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: { type: Number, default: 0 } // 0-100
})

const circumference = 2 * Math.PI * 54

const dashOffset = computed(() => {
  return circumference - (props.progress / 100) * circumference
})
</script>

<style lang="scss" scoped>
.circle-progress {
  width: 150rpx;
  height: 150rpx;
  position: relative;

  .circle-svg {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  .circle-bg {
    fill: none;
    stroke: #ffe4ec;
    stroke-width: 10;
  }

  .circle-bar {
    fill: none;
    stroke-width: 10;
    stroke-linecap: round;
    stroke-dasharray: 339.292;
    transition: stroke-dashoffset 0.6s ease;
  }

  .circle-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    text {
      font-size: 26rpx;
      font-weight: bold;
      color: #ff4f9a;
    }

    .bubble {
      position: absolute;
      bottom: -10rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 20rpx;
      height: 20rpx;
      background: rgba(255, 182, 193, 0.7);
      border-radius: 50%;
      box-shadow: 0 0 8rpx rgba(255, 105, 180, 0.8);
      animation: bubbleMove 1.5s infinite ease-in-out;
    }
  }
}

@keyframes bubbleMove {
  0% { transform: translate(-50%, 0); opacity: 0.8; }
  50% { transform: translate(-50%, -10rpx); opacity: 1; }
  100% { transform: translate(-50%, 0); opacity: 0.8; }
}
</style>

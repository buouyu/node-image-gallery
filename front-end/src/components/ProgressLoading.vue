<template>
    <up-popup mode="center" round="20" bgColor="#fafaf9dd" :show="isShow">
        <view class="px-2 py-1 flex items-center flex-col">
            <CuteCircleProgress :progress="progress">
            </CuteCircleProgress>
            <!-- <view class="pt-1 text-sm text">正在努力加载中</view> -->
            <view class=" loading-text">
                {{ text }}
                <text>.</text><text>.</text><text>.</text>
            </view>
        </view>
    </up-popup>
</template>

<script setup>
import { ref } from 'vue'
import CuteCircleProgress from '@/components/CuteCircleProgress.vue'
const isShow = defineModel()
const props = defineProps({
    progress: { type: Number, default: 16 }, // 0-100
    text: {
        type: String,
        default: '正在加载中'
    }
})
const emits = defineEmits([])
</script>
<style lang="scss" scoped>
// .text {
//     color: #bb76ff;
// }

.loading-text {
    // position: absolute;
    padding-top: 8rpx;
    width: 100%;
    text-align: center;
    font-size: 22rpx;
    font-weight: 500;
    color: #ff4f9a;
    animation: fadePulse 1.5s infinite ease-in-out;

    text {
        animation: dotBlink 1.5s infinite;
    }

    text:nth-child(1) {
        animation-delay: 0s;
    }

    text:nth-child(2) {
        animation-delay: 0.3s;
    }

    text:nth-child(3) {
        animation-delay: 0.6s;
    }
}

@keyframes fadePulse {

    0%,
    100% {
        opacity: 0.7;
    }

    50% {
        opacity: 1;
    }
}

@keyframes dotBlink {

    0%,
    80%,
    100% {
        opacity: 0;
    }

    40% {
        opacity: 1;
    }
}
</style>

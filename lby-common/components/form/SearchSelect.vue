<template>
    <view class="wrapper">
        <view v-if="label" class="label nowrap text-gray">
            {{ label }}
        </view>
        <scroll-view scroll-x class="content">
            <view class="text-container">
                <text @click="handleSelect(item)" :class="['px-1 nowrap', model == item.value && 'text-yellow']"
                    v-for="item, i in columns" :key="i">
                    {{ item.text }}
                </text>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
const props = defineProps({
    label: {
        type: String
    },
    columns: {
        type: Array,
        required: true
    }
})
const model = defineModel()
const handleSelect = async (item) => {
    model.value = item.value
}
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    width: 100%;
    overflow: hidden;

    .label {}

    .content {
        // flex: 1;
        flex-grow: 1;
        overflow-x: auto;
        // border: 1px solid blue;
    }
}

.text-container {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    //   overflow: hidden; /* 可选 */
    //   text-overflow: ellipsis; /* 可选 */
}
</style>
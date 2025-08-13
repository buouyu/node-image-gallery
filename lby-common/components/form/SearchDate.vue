<template>
    <view class="wrapper">
        <view v-if="label" class="label nowrap text-gray">
            {{ label }}
        </view>
        <template v-if="platform">
            <!-- 兼容web端没有touch事件问题 -->
            <div v-if="platform == 'windows'" ref="scrollContainer" @wheel="onWheel" class="content">
                <view class="text-container">
                    <text @click="handleSelect(item)"
                        :class="['px-1 nowrap', activeValue == item.value && 'text-yellow']" v-for="item, i in columns"
                        :key="i">
                        {{ item.text }}
                    </text>
                </view>
                <up-calendar allowSameDay :minDate="rangeDate.minDate" :maxDate="rangeDate.maxDate"
                    :defaultDate="defaultDate" monthNum="24" :show="isDateRangeShow" mode="range"
                    @confirm="handleCalendarConfirm">
                </up-calendar>
            </div>
            <scroll-view v-else scroll-x class="content">
                <view class="text-container">
                    <text @click="handleSelect(item)"
                        :class="['px-1 nowrap', activeValue == item.value && 'text-yellow']" v-for="item, i in columns"
                        :key="i">
                        {{ item.text }}
                    </text>
                </view>
                <up-calendar allowSameDay :minDate="rangeDate.minDate" :maxDate="rangeDate.maxDate"
                    :defaultDate="defaultDate" monthNum="24" :show="isDateRangeShow" mode="range"
                    @confirm="handleCalendarConfirm">
                </up-calendar>
            </scroll-view>
        </template>


    </view>
</template>

<script setup>
import { ref, defineProps, computed, onMounted } from 'vue'
import { getDateRangeByValue, formatTime } from 'lby-common/utils/time.js'
const props = defineProps({
    label: {
        type: String,
    },
    default:{
        type:String,
        default:'全部'
    }
})
const emit = defineEmits(['onChange'])
const columns = ref([
    {
        value: 0,
        text: '全部'
    }, {
        value: 1,
        text: '今天'
    }, {
        value: 2,
        text: '昨天'
    }, {
        value: 3,
        text: '近30天'
    },
    {
        value: 4,
        text: '本月'
    },
    {
        value: 5,
        text: '上月'
    },
    {
        value: 6,
        text: '自定义'
    }
])
const isDateRangeShow = ref(false)
const activeValue = ref(0)
const defaultDate = ref([formatTime(new Date(), 'YYYY-MM-DD'), formatTime(new Date(), 'YYYY-MM-DD')])
const model = defineModel()
const rangeDate = computed(() => {
    const min = new Date()
    const max = new Date()
    const minDate = formatTime(min.setFullYear(min.getFullYear() - 1), 'YYYY-MM-DD')
    const maxDate = formatTime(new Date(max.getFullYear(), max.getMonth() + 1, 0), 'YYYY-MM-DD')
    return {
        minDate,
        maxDate
    }
})
const handleSelect = async (item) => {
    activeValue.value = item.value
    if (item.value == 6) {
        isDateRangeShow.value = true
    } else {
        model.value = getDateRangeByValue(item.value)
        columns.value.at(-1).text = `自定义`
        emit('onChange', item)
    }
}
const handleCalendarConfirm = async (value) => {
    const s = value[0]
    const e = value[value.length - 1]
    const start = `${s} 00:00:00`
    const end = `${e} 23:59:59`
    isDateRangeShow.value = false
    model.value = [start, end]
    const text = `${s}~${e}`
    columns.value.at(-1).text = `自定义(${text})`
    emit('onChange', { value: 6, text })
}
const scrollContainer = ref(null)
const platform = ref('')
const onWheel = async (event) => {
    if (!scrollContainer.value) return;
    // 判断滚动方向
    const delta = 40
    const deltaX = event.deltaY > 0 ? delta : -delta; // 每次滚动调整的距离
    scrollContainer.value.scrollLeft += deltaX;
    event.preventDefault();
}
const init = async () => {
    platform.value = await uni.gb.getPlatform()
}
onMounted(() => {
    const item = columns.value.find(it=>it.text==props.default)
    handleSelect(item)
    init()
})
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
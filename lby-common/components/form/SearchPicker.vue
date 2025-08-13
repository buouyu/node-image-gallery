<template>
    <view class="wrapper">
        <view v-if="label" class="label nowrap text-gray">
            {{ label }}
        </view>
        <view class="content">
            <span @click="showPicker" class="flex items-center">
                {{ activeText ? activeText : placeholder }}
                <up-icon name="arrow-down"></up-icon>
            </span>
        </view>
        <up-picker @cancel="handleClose" closeOnClickOverlay @close="handleClose" @confirm="handlePickerConfirm"
            :show="isPickerShow" :columns="columns"></up-picker>
    </view>
</template>

<script setup>
import { ref, defineProps, computed, onMounted, watch } from 'vue'
const props = defineProps({
    label: {
        type: String
    },
    columns: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
    }
})
const activeItem = ref({})
const activeText = ref(null)
const model = defineModel()
const emit = defineEmits(['onChange'])
const columns = computed(() => [props.columns.map(it => (it.text))])
const placeholder = ref(props.placeholder ? props.placeholder : `请选择${props.label.replace(/[:：]/g, '')}`)
const isPickerShow = ref(false)
const showPicker = async () => {
    isPickerShow.value = true
}
const handleClose = async () => {
    isPickerShow.value = false
}
const handlePickerConfirm = async (data, value) => {
    const name = data.value[0]
    const item = props.columns.find(it => it.text == name)
    model.value = item.value
    isPickerShow.value = false
}
const modelChange = async (value) => {
    if (value != null || value != undefined) {
        const item = props.columns.find(it => it.value == value)
        if (item) {
            activeItem.value = item
            activeText.value = item.text
        }
        emit('onChange', activeItem.value)
    }
}

watch(model, () => {
    modelChange(model.value)
})

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
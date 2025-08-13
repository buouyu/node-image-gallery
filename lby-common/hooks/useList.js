import { computed, ref, watch } from 'vue'
export const useList = (watchers, fn, option = {}) => {
    //兼容分页和不分页
    const {
        size,
        filterWatchs,
        filter,
    } = {
        size: 10,
        ...option
    }
    const total = ref(0)
    const current = ref(1)
    const originList = ref([])
    const list = ref([])
    const isLoading = ref(false)

    const getList = async (cur = 1) => {
        current.value = cur
        isLoading.value = true
        const setList = (arr) => {
            setTimeout(() => {
                if (cur == 1) {
                    list.value = arr
                } else {
                    list.value.push(...arr)
                }
            }, 0);
            // if (cur == 1) {
            //     list.value = arr
            // } else {
            //     list.value.push(...arr)
            // }
        }
        const res = await fn({ current: cur, size })
        if (!res) {
            isLoading.value = false
            return
        } else if (Array.isArray(res)) {
            // if (cur == 1) {
            //     list.value = res
            // } else {
            //     list.value.push(...res)
            // }
            setList(res)
            total.value = res.length
        } else {
            const newList = res.records || []
            setList(newList)
            // if (cur == 1) {
            //     list.value = newList
            // } else {
            //     list.value.push(...newList)
            // }
            total.value = res.total

        }
        isLoading.value = false
        if (filterWatchs) {
            originList.value = list.value
            filterList()
        }
    }
    const filterList = async () => {
        const newList = await filter(originList.value)
        // total.value = newList.length
        list.value = newList
    }
    const saveItem = async (item) => {
        const index = list.value.findIndex(it => it.id == item.id)
        if (~index) {
            list.value.splice(index, 1, item)
        }
    }

    setTimeout(() => {
        watch(watchers, () => getList(), { deep: true })
        if (filterWatchs) {
            watch(filterWatchs, () => filterList(), { deep: true })
        }
    }, 10);
    // :getList="getList" :total="total" :current="current" :list="list" :isLoading="isLoading"
    return {
        getList,
        total,
        current,
        list,
        isLoading,
        saveItem
    }
}
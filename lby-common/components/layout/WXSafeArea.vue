<template>
        <view :style="{
                height: height + 'px'
        }" class="safe"></view>
</template>

<script setup name="WXSafeArea">
import { onBeforeMount, ref } from 'vue'
function getSafeArea() {
        // #ifdef MP-WEIXIN
        const sys = wx.getSystemInfoSync()
        const menu = wx.getMenuButtonBoundingClientRect()
        const statusBar = sys.statusBarHeight || 20
        const navBar = menu.bottom + menu.top - statusBar
        const safeTop = statusBar + navBar
        const bottom = (sys.screenHeight - sys.safeArea.bottom) || 0;
        return {
                statusBarHeight: statusBar,
                navBarHeight: navBar,
                safeTop: safeTop,
                bottom
        }
        // #endif

        // #ifndef MP-WEIXIN
        return {
                statusBarHeight: 0,
                navBarHeight: 0,
                safeTop: 0,
                bottom: 0
        }
        // #endif


}
const height = ref(0)
const props = defineProps({
        bottom: {
                type: Boolean,
                default: false
        },
        top: {
                type: Boolean,
                default: true
        }
})

onBeforeMount(() => {
        const data = getSafeArea()
        if (props.bottom) {
                height.value = data.bottom
        } else {
                height.value = data.statusBarHeight
        }
})
</script>

<style scoped lang="scss"></style>

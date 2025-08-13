<template>
  <view class="wrapper">
    <view v-if="slots.header" class="header">
      <slot name="header"></slot>
      <view
        v-if="isSelect && !singleSelect"
        class="top-bar mx-1 flex justify-between items-center"
      >
        <view class="">
          <slot name="bar"></slot>
        </view>
        <view class="flex justify-between items-center">
          <up-checkbox
            @change="handleSelectAll"
            usedAlone
            v-model:checked="isSelectAll"
            label="全选"
          ></up-checkbox>
        </view>
      </view>
    </view>
    <view class="content">
      <scroll-view
        v-if="slots.item"
        enable-back-to-top
        scroll-with-animation
        @scroll="onScroll"
        scroll-anchoring
        :scroll-top="scrollTop"
        :refresher-enabled="true"
        @refresherrefresh="refresherrefresh"
        :refresher-triggered="isRefreshing"
        @scrolltolower="scrolltolower"
        scroll-y
        style="height: 100%"
      >
        <template v-for="(item, index) in list" :key="index">
          <view
            @click.stop="handleSelect(item)"
            :class="[
              !isNotItemStyle && 'm-1 rounded',
              !isNotItemStyle && itemIsSelctedClass(item),
            ]"
          >
            <slot :index="index" :item="item" name="item"></slot>
          </view>
        </template>
        <view class="py-1">
          <up-loadmore
            v-if="list.length || loadMoreStatus == 'loading'"
            :status="loadMoreStatus"
          />
          <slot v-else name="empty">
            <!-- <MyEmpty v-if="hasMyEmpty" ></MyEmpty>
            <up-empty v-else mode="list"> </up-empty> -->
            <component :is="hasMyEmpty ? 'MyEmpty' : 'up-empty'" mode="list"></component>
          </slot>
        </view>
      </scroll-view>
      <slot v-else name="content"></slot>
    </view>

    <view class="">
      <slot name="footer">
        <!-- <view @click="hanldeTest">test</view> -->
      </slot>
    </view>
  </view>
</template>

<script setup>
import {
  ref,
  defineProps,
  useSlots,
  onMounted,
  watch,
  computed,
  getCurrentInstance,
} from "vue";
const props = defineProps({
  total: {
    type: Number,
  },
  current: {
    type: Number,
  },
  list: {
    type: Array,
    // required: true,
  },
  getList: {
    type: Function,
    // required: true,
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
  },
  selectMiddleware: {
    // 两个参数 item ,isAll ,返回true or false
    type: Function,
  },
  singleSelect: {
    type: Boolean,
  },
  isNotItemStyle: {
    type: Boolean,
    default: false,
  },
  // isFirstLoading: {
  //   type: Boolean,
  //   default: false,
  // }
});
const slots = useSlots();
const instance = getCurrentInstance()
const components = instance?.appContext.components
const hasMyEmpty = components && 'MyEmpty' in components
const emit = defineEmits(["onSelect"]);
const scrollTop = ref(0);
const oldScrollTop = ref(null);
const isRefreshing = ref(false);
const isLoadList = ref(false);
const isMore = ref(true);
// const testSelect = ref(true)
const isSelectAll = ref(false);
const loadMoreStatus = ref("nomore"); // nomore  loading
const itemIsSelctedClass = computed(() => {
  return (item) => {
    const active = "item-actived";
    const defalut = "item-defalut";
    if (isSelectAll.value) {
      // if (props.selectMiddleware) {
      //     const isTrue = props.selectMiddleware(item, true)
      //     if (isTrue) return active
      //     return defalut
      // }
      return active;
    } else {
      if (item.isSelected) {
        return active;
      } else {
        return defalut;
      }
    }
  };
});
watch(
  () => props.isLoading,
  async () => {
    if (props.current != 1) return;
    // scrollTop.value = oldScrollTop.value;
    // setTimeout(() => {
    //   scrollTop.value = 0;
    // }, 0);
    if (props.isLoading == true) {
      // if (props.isFirstLoading) {
      //   isRefreshing.value = 'restore';
      // }
      loadMoreStatus.value = "loading";
    } else {
      loadMoreStatus.value = "nomore";
    }
  }
);
// const hanldeTest = async () => {
//   console.log("scrollTop.value-----114", scrollTop.value);
// };
const onScroll = async (e) => {
  oldScrollTop.value = e.detail.scrollTop;
};
const closeRefreshing = async () => {
  isRefreshing.value = "restore";
  setTimeout(() => {
    isRefreshing.value = false;
  }, 0);
};
const refresherrefresh = async () => {
  if (props.isLoading == true) return;
  // await init();
  await props.getList();
  emit("onSelect", null, [], false);
  isSelectAll.value = false;
  await closeRefreshing();
};
const init = async () => {
  loadMoreStatus.value = "loading";
  // isRefreshing.value = true;
  await props.getList();
  loadMoreStatus.value = "nomore";
};
const scrolltolower = async () => {
  if (isLoadList.value) return;
  isLoadList.value = true;
  if (props.total && props.current) {
    if (props.list.length >= props.total) {
      isMore.value = false;
      loadMoreStatus.value = "nomore";
    } else {
      loadMoreStatus.value = "loading";
      await props.getList(props.current + 1);
    }
  }
  isLoadList.value = false;
};
const handleSelect = async (item) => {
  if (!props.isSelect) return;
  if (props.selectMiddleware) {
    const flag = await props.selectMiddleware(item);
    if (!flag) return;
  }
  if (props.singleSelect) {
    props.list.forEach((it) => (it.isSelected = false));
    item.isSelected = !item.isSelected;
    emit("onSelect", item);
    return;
  }
  item.isSelected = !item.isSelected;
  const selectList = props.list.filter((it) => it.isSelected);
  if (selectList.length == props.list.length) {
    isSelectAll.value = true;
    emit("onSelect", item, selectList, true);
  } else {
    emit("onSelect", item, selectList, false);
    isSelectAll.value = false;
  }
};
const handleSelectAll = async (val) => {
  if (!props.isSelect) return;
  isSelectAll.value = val;
  props.list.forEach((it) => (it.isSelected = val));
  emit("onSelect", null, val ? props.list : [], val);
};

onMounted(async () => {
  if (slots.item) {
    setTimeout(async () => {
      await init();
    }, 0);
  }
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow-y: auto;
}

.item-defalut {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
}

.item-actived {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  border: 1px solid #71e76a96;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
}

.top-bar {
  border-bottom: 1px solid #d1d5db96;
}

::v-deep .u-popup__content__close--top-right {
  display: none !important;
}
</style>

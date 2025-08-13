<template>
  <up-row style="width: 100%;">
    <up-col span="8">
      <up-input placeholder="请输入验证码" border="bottom" v-model="model"></up-input>
    </up-col>
    <up-col span="4">
      <up-button @tap="getCode">{{ tips }}</up-button>
    </up-col>
  </up-row>
  <!-- <up-code-input  mode="line"  maxlength="4" disabledDot class="code" v-model="model"></up-code-input> -->
  <up-code
    :seconds="seconds"
    @end="end"
    @start="start"
    ref="uCodeRef"
    @change="codeChange"
  ></up-code>
</template>

<script setup>
import { ref, defineProps, defineModel, inject } from 'vue'
import rqs from 'lby-common/services/request'
const { field, value } = defineProps(['field', 'value'])
const phone = inject('phone')
const model = defineModel()

const tips = ref('')
const seconds = ref(60)
const uCodeRef = ref(null)

const codeChange = (text) => {
  tips.value = text
}

const getCode = async () => {
  if (!uni.$u.test.mobile(phone.value)) {
    uni.$u.toast('请输入正确的手机号')
    return
  }
  if (uCodeRef.value.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码',
    })
    const [err, res] = await rqs.post('/auth/sendSms', {
      phone: phone.value,
    })
    uni.hideLoading()
    if (err) {
      uni.$u.toast('验证码发送失败,请稍后重试')
      return
    } else {
      uni.$u.toast('验证码已发送')
    }
    uCodeRef.value.start()
    // setTimeout(() => {
    //   uni.hideLoading()
    //   // 这里此提示会被start()方法中的提示覆盖
    //   uni.$u.toast('验证码已发送')
    //   // 通知验证码组件内部开始倒计时
    //   uCodeRef.value.start()
    // }, 1000)
  } else {
    uni.$u.toast('倒计时结束后再发送')
  }
}

const end = () => {
  uni.$u.toast('倒计时结束')
}

const start = () => {
  uni.$u.toast('倒计时开始')
}
</script>

<style scoped lang="scss">
.wrapper {
  // width: 100%;
  // display: flex;
  // justify-content: space-between;
  // .code {
  //   flex: 1;
  // }
  // .btn {
  //   margin-left: 10rpx;
  //   width: 200rpx;
  // }
}
</style>

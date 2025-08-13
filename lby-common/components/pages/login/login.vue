<template>
  <view class="page wrapper">
    <view v-if="loginType == 1 && !localUser?.id" class="container">
      <view class="form">
        <Form :model="userInfo" :formOption="formOption" :fields="fields"> </Form>
      </view>
    </view>
    <view v-else class="container">
      <view class="profile-card">
        <!-- #ifdef MP-WEIXIN -->
        <button plain class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar.stop="onChooseAvatar">
          <image class="avatar" :src="avatarUrl"></image>
        </button>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <view class="h5-upload">
          <up-upload @delete="deleteImage" :fileList="avatarUrl ? [{ url: avatarUrl }] : []" :maxCount="1"
            @afterRead="onChooseImage">
          </up-upload>
        </view>
        <!-- #endif -->
        <input type="nickname" class="nickname" :maxlength="12" v-model="nickname" placeholder="请输入昵称" />
        <view class="slogan">给时光以生命，而不是给生命以时光</view>
        <view @click="handleSaveAvatarAndNickName" class="logout-button">{{
          route.way == "auto" ? "登录" : "保存"
        }}</view>
        <!-- #ifdef H5 -->
        <up-button class="mt-2" style="width: 300rpx" @click="loginout" shape="circle" text="退出登录"></up-button>
        <!-- #endif -->
      </view>
      <view class="tips-card">
        <view class="tips-title">提示</view>
        <view class="tip">1. 设置头像和昵称后，点击按钮保存</view>
        <view class="tip">2. 您的信息仅用于个性化显示，不会被用于其他用途</view>
        <view class="tip">3. 可随时修改头像&昵称，不影响您已有数据的展示</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onShow, onLoad } from "@dcloudio/uni-app";
import rqs, { uploadFile } from "lby-common/services/request";
import Form from "lby-common/components/form/Form.vue";
import { onLoginSuccess, wxlogin, saveUserInfo, h5login } from "./loginUtil.js";
import { ref, onMounted, watch, provide } from "vue";
const props = defineProps({});
const route = ref({});
const fields = ref([]);
const formOption = ref({});
const localUser = ref(null);
const userInfo = ref({});
const loginType = ref(null); // 1h5 2微信小程序
const avatarUrl = ref("");
const nickname = ref("");
const onChooseAvatar = async (e) => {
  const { avatarUrl: url } = e.detail;
  avatarUrl.value = url;
};
const onChooseImage = async (val) => {
  avatarUrl.value = val.file.url;
};
const deleteImage = async () => {
  avatarUrl.value = null;
};
const handleSaveAvatarAndNickName = async () => {
  if (!avatarUrl.value) return uni.gb.showToast("请上传头像");
  if (!nickname.value) return uni.gb.showToast("请输入用户名");
  const user = uni.gb.getUserInfo();
  let image = null;
  if (user.avatar != avatarUrl.value) {
    uni.gb.loading()
    image = await uploadFile(
      avatarUrl.value,
      { user_id: user.id, type: 4 },
      { url: "/getAvatarUrl" }
    );
  }
  if (user.nick_name != nickname.value || user.avatar != avatarUrl.value) {
    const params = {
      id: user.id,
      nick_name: nickname.value,
    };
    if (image?.url) {
      params.avatar = image.url;
    }
    await saveUserInfo(params);
  }
  uni.gb.loading(false)
  uni.gb.showSuccess("保存成功");
  if (route.value.way == "auto") {
    uni.gb.push("/pages/index/index", undefined, "tab");
  } else {
    uni.gb.back();
  }
};
const handleSubsectionChange = () => {
  fields.value = [
    {
      fieldType: "input",
      label: "账号",
      prop: "username",
      required: true,
      // type: 'number',
      // ruleType: 'phone',
    },
    {
      fieldType: "input",
      label: "密码",
      prop: "password",
      type: "password",
      required: true,
    },
  ];
  userInfo.value = {
    username: "",
    password: "",
  };

  formOption.value = {
    labelWidth: 60,
    btnCustomStyle: "margin-top: 20px",
    btns: [
      {
        text: "登录/注册",
        span: 12,
        type: "primary",
        isPreValid: true,
        click: login,
      },
    ],
  };
};

const login = async () => {
  const user = await h5login(userInfo.value);
  if (user) {
    uni.gb.showToast("登录成功");
    init();
  }
  // toRedirect();
};
onMounted(() => {
  handleSubsectionChange();
});
const loginout = async () => {
  uni.clearStorageSync();
  init();
};
// const toRedirect = () => {
//   if (loginConfig.jumpType == "bar") {
//     uni.switchTab({
//       url: loginConfig.jumpPage,
//     });
//   } else {
//     uni.navigateTo({
//       url: loginConfig.jumpPage,
//     });
//   }
// };
const init = async () => {
  const userPre = uni.gb.getUserInfo();
  if (userPre) {
    nickname.value = userPre.nick_name;
    avatarUrl.value = userPre.avatar;
  }
  await wxlogin();
  const user = uni.gb.getUserInfo();
  localUser.value = user;
  if (user) {
    nickname.value = user.nick_name;
    avatarUrl.value = user.avatar;
  }
  // #ifdef H5
  loginType.value = 1;
  // #endif
  // #ifdef MP-WEIXIN
  loginType.value = 2;
  // #endif
};
onLoad((params) => {
  route.value = params;
  init();
});
</script>

<style scoped lang="scss">
.wrapper {
  overflow: hidden;
}

.form {
  padding: 30px;
}

.container {
  padding: 40rpx 30rpx;
  background-color: #f6f7f9;
}

.profile-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 60rpx 30rpx 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
  text-align: center;
  margin-bottom: 30rpx;

  .avatar-wrapper {
    // all: unset;
    background: unset;
    box-shadow: none;
    border: none;
    /* 一键清除所有浏览器默认样式 */
  }

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    margin: 0 auto 20rpx;
    background-color: #eee;
  }

  .nickname {
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 10rpx;
    color: #333;
  }

  .slogan {
    font-size: 24rpx;
    color: #888;
    margin-bottom: 40rpx;
  }

  .logout-button {
    display: inline-block;
    width: 300rpx;
    height: 70rpx;
    line-height: 70rpx;
    background-image: linear-gradient(to right, #7ef9d4, #fff18e);
    border: none;
    border-radius: 35rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
}

// .h5-upload {
//   display: flex;
//   justify-content: center;
// }
::v-deep .u-upload__wrap {
  justify-content: center;
}

.tips-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  font-size: 26rpx;
  color: #555;
  line-height: 1.8;

  .tips-title {
    font-weight: bold;
    font-size: 28rpx;
    margin-bottom: 20rpx;
  }

  .tip {
    margin-bottom: 10rpx;
  }
}
</style>

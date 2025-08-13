<script>
async function wxUpdataVersion() {
  // #ifdef MP-WEIXIN
  const updateManager = wx.getUpdateManager();
  console.log("updateManager-----5", updateManager);
  // 检查新版本
  updateManager.onCheckForUpdate((res) => {
    console.log("res.hasUpdate-----8", res.hasUpdate);
    console.log("是否有新版本：", res.hasUpdate);
  });

  // 下载完成后，提示用户
  updateManager.onUpdateReady(() => {
    wx.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success(res) {
        if (res.confirm) {
          updateManager.applyUpdate(); // 重启小程序并应用新版本
        }
      },
    });
  });

  // 更新失败
  updateManager.onUpdateFailed(() => {
    wx.showModal({
      title: "更新失败",
      content: "新版本下载失败，请删除小程序后重新打开。",
    });
  });
  // #endif
}
export default {
  onLaunch: function () {
    // console.log('App Launch')
  },
  onShow: function () {
    // console.log('App Show')
    wxUpdataVersion();
  },
  onHide: function () {
    // console.log('App Hide')
  },
};
</script>

<style lang="scss">
// #ifdef H5
uni-page-body {
  height: 100%;

  & > .container {
    height: 100%;
    width: 100%;
  }
}

.page {
  background-color: #f6f7f9;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
}
// #endif

// #ifdef MP-WEIXIN
.page {
  background-color: #f6f7f9;
  // background-color: #d5320a76;
  // display: inline-block;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
// #endif
#u-a-p > div {
  z-index: 999999;
}
@import "./utils/common.css";
@import "lby-common/style/index.css";
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-plus/index.scss";
</style>

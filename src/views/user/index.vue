<template>
  <div class="user-container">
    <!-- 导航信息 -->
    <van-nav-bar title="用户列表" left-arrow @click-left="onback"/>
    <!-- /导航信息 -->
    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image
          class="col1"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">123</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">123</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">123</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">123</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button
              type="primary"
              size="small"
            >私信</van-button>
            <van-button
              type="info"
              size="small"
            >关注</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>用户的认证信息</span>
        </div>
        <div>
          <span>简介：</span>
          <span>用户的简介信息</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    onback () {
      this.$router.go(-1)
    },
    getAutherUserInfo () {

    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    >.row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      >.col1 {
        width: 80px;
        height: 80px;
      }
      >.col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        >.row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
      .intro-wrap {
        display: flex;
        height: 60px;
        justify-content: space-between;
      }
    }
  }
}
</style>

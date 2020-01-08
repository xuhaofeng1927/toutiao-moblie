<template>
  <div class="login">
    <!--引入导航 -->
    <van-nav-bar title="登录" />
    <!--引入输入框-->
    <div class="login-field">
      <van-field placeholder="请输入用户名"  left-icon="user-o">
      </van-field>
      <van-field placeholder="请输入验证码">
         <van-icon slot="left-icon" class-prefix="icont" name="mima" />
      </van-field>

    </div>
    <div class="loginBtn">
      <van-button type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="less" scoped>
  .login-field {
    margin-top:20px;
    .van-cell {
      height: 50px;
      padding: 10px 20px;
      align-items: center;
      .login-btn {
      width: 100%;
    }
    }

  }
  .loginBtn {
    margin-top:20px;
   padding: 27px 16px;
    .van-button {
      width: 100%;
      background-color: #6db4fb
    }
  }
</style>

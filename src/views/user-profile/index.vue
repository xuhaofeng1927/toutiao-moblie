<template>
  <div class="user-info">
    <!-- 导航信息 -->
    <van-nav-bar title="用户信息" left-arrow @click-left="$router.go(-1)" right-text="保存" />
    <!-- /导航信息 -->
    <van-cell-group>
      <van-cell title="头像" @click="onSelectFile">
        <van-image round width="30" height="30" fit="cover" :src="user.photo" />
        <input type="file" hidden ref="file" @change="onFileChange" />
      </van-cell>
      <van-cell title="昵称" :value="user.name" @click="onNameAlter" is-link />
      <van-cell title="介绍" value="内容" is-link />
      <van-cell title="性别" :value="user.gender?'女':'男'" is-link @click="isSexShow=true" />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
    <!-- 头像预览 -->
    <van-image-preview v-model="isHeadShow" :images="images" @close="$refs.file.value = ''">
      <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确定"
        @click-left="isHeadShow = false"
        @click-right="onUpdateAvatar"
      />
    </van-image-preview>
    <!-- /头像预览 -->
    <!-- 修改昵称 -->
    <van-popup v-model="isNameShow" position="bottom">
      <van-nav-bar
        title="修改昵称"
        left-text="返回"
        right-text="确认"
        @click-left="isNameShow=false"
        @click-right="onClickNameRight"
        show-word-limit
      />
      <van-field
        v-model="nameMessage"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <!-- /修改昵称 -->
    <!-- 修改性别 -->
      <van-action-sheet
        v-model="isSexShow"
        :actions="actions"
        cancel-text="取消"
        @cancel="isSexShow=false"
        @select="onGenderSelect"
      />
    <!-- /修改性别 -->
  </div>
</template>

<script>
import {
  getPersonUserxInfo,
  updateUserPhoto,
  updateUserProfile
} from '@/api/user'
// import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      user: {}, // 接收用户个人信息
      isHeadShow: false, // 头像预览显示开关
      images: [], // 预览图片列表
      isNameShow: false, // 昵称修改显示开关
      nameMessage: '', // 昵称修改内容
      isSexShow: false, // 性别修改显示开关
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ]
    }
  },
  computed: {
    // 这里的目的主要是为了访问方便
    // 每次访问 ref 成员都需要：this.$refs['file']
    // 因为多次访问到了该成员，所以我可以使用计算属性封装简化对成员的访问
    file () {
      return this.$refs['file']
    }
  },
  methods: {
    async getPersonUserxInfo () {
      try {
        const { data } = await getPersonUserxInfo()
        this.user = data.data
      } catch (error) {
        console.log(error)
      }
    },
    onSelectFile () {
      this.file.click()
    },
    onFileChange () {
      // 通过 file-input 获取文件对象
      const fileObj = this.file.files[0] // files代表为文件dom对象的一个属性
      const fileData = window.URL.createObjectURL(fileObj)
      // 获取图片文件
      this.images = [fileData]
      // 显示预览图片
      this.isHeadShow = true
    },
    // 预览图片确定时请求数据
    async onUpdateAvatar () {
      this.isHeadShow = false
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '头像上传中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        // 构造包含文件的表单对象
        const fd = new FormData()
        // this.file.files[0] files代表为文件dom对象的一个属性
        fd.append('photo', this.file.files[0])
        const { data } = await updateUserPhoto(fd)
        // 更新视图
        this.user.photo = data.data.photo
        // 提示成功
        this.$toast.success('上传成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('上传失败')
      }
    },
    onNameAlter () {
      this.isNameShow = true
      this.nameMessage = this.user.name
    },
    // 更新用户信息(封装整体公共方法)
    async onupdateUserProfile (filed, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await updateUserProfile({
          [filed]: value // 注意属性名使用中括号包裹，否则会当做字符串来使用而不是变量
        })
        this.$toast.success('更新成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新失败')
      }
    },
    // 修改昵称
    onClickNameRight () {
      this.onupdateUserProfile('name', this.nameMessage)
      this.user.name = this.nameMessage
      this.isNameShow = false
    },
    onGenderSelect (item) {
      this.onupdateUserProfile('gender', item.value)
      this.user.gender = item.value
      this.isSexShow = false
    }
  },
  created () {
    this.getPersonUserxInfo()
  }
}
</script>

<style scoped lang="less">
.van-popup {
  .van-nav-bar {
    background-color: white;
    .van-nav-bar__title {
      color: black;
    }
    .van-nav-bar__left {
      .van-icon-arrow-left {
        color: black;
      }
    }
  }
  .van-nav-bar__text {
    color: black;
  }
}

/deep/ .van-image-preview__cover {
  top: unset;
  left: 0;
  right: 0;
  bottom: 0;
  .van-nav-bar {
    background: #000;
  }
}
</style>

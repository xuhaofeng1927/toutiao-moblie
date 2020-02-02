<template>
  <div class="user-info">
    <!-- 导航信息 -->
    <van-nav-bar title="用户信息" left-arrow @click-left="onback" right-text="保存" />
    <!-- /导航信息 -->
    <van-cell-group>
      <van-cell title="头像" @click="onSelectFile">
        <van-image round width="30" height="30" fit="cover" :src="user.photo" />
        <input type="file" hidden ref="file" @change="onFileChange" />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="介绍" value="内容" is-link />
      <van-cell title="性别" :value="user.gender?'女':'男'" is-link />
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
  </div>
</template>

<script>
import { getPersonUserxInfo, updateUserPhoto } from '@/api/user'
// import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      user: {}, // 接收用户个人信息
      isHeadShow: false,
      images: [] // 预览图片列表
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
    onback () {
      this.$router.go(-1)
    },
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
    }
  },
  created () {
    this.getPersonUserxInfo()
  }
}
</script>

<style scoped lang="less">
.van-nav-bar__text {
  color: white;
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

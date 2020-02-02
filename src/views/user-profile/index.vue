<template>
  <div class="user-info">
    <!-- 导航信息 -->
    <van-nav-bar title="用户信息" left-arrow @click-left="onback" right-text="保存" />
    <!-- /导航信息 -->
    <van-cell-group>
      <van-cell title="头像" @click="onSelectFile">
        <van-image
          round
          width="30"
          height="30"
          fit="cover"
          :src="user.photo"
        />
        <input type="file" hidden ref="file" @change="onFileChange">
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="介绍" value="内容" is-link />
      <van-cell title="性别" :value="user.gender?'女':'男'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getPersonUserxInfo, updateUserPhoto } from '@/api/user'
import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      user: {} // 接收用户个人信息
    }
  },
  computed: {
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
      ImagePreview({
        images: [fileData],
        // 预览关闭后的
        onClose: this.savePhoto()
      })
    },
    async savePhoto () {
      await this.$dialog.confirm({
        title: '头像选择',
        message: '确认使用该图片作为头像吗？'
      })
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const fileObj = this.file.files[0] // files代表为文件dom对象的一个属性
        // 构造包含文件的表单对象
        const fd = new FormData()
        fd.append('photo', fileObj)
        // fd.append('photo', fileObj)
        await updateUserPhoto(fd)
        // 更新视图
        this.user.photo = URL.createObjectURL(fileObj)
        // 提示成功
        this.$toast.success('保存成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('保存失败')
      }
    }
  },
  created () {
    this.getPersonUserxInfo()
  }
}
</script>

<style scoped lan="less">
.van-nav-bar__text {
  color: white;
}
</style>

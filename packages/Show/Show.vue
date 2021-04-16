<template>
  <!-- 素材 -->
  <div>
    <!-- 视频 -->
    <el-popover
      placement="right"
      width="200"
      trigger="hover"
      v-if="type === 'video'"
      popper-class="material-popover"
    >
      <el-image :src="cover" fit="contain"></el-image>
      <i
        @click="playVideo(url)"
        class="iconfont iconbofanganniu"
        style="position: absolute;left: 50%;top: 50%;color: #fff;transform: translate(-50%, -50%);font-size:26px;cursor: pointer;"
      ></i>
      <div
        slot="reference"
        style="position: relative;width: 68px; height: 38px;display: inline-block;"
      >
        <el-image
          style="width: 68px; height: 38px"
          :src="cover"
          fit="cover"
        ></el-image>
        <i
          @click="playVideo(url)"
          class="iconfont iconbofanganniu"
          style="position: absolute;left: 50%;top: 50%;color: #fff;transform: translate(-50%, -50%);font-size:18px;cursor: pointer;"
        ></i>
      </div>
    </el-popover>
    <!-- 图片 -->
    <el-popover
      placement="right"
      width="200"
      trigger="hover"
      v-if="type === 'image'"
      popper-class="material-popover"
    >
      <el-image :src="url" fit="contain"></el-image>
      <el-image
        slot="reference"
        style="width: 68px; height: 38px;display: inline-block;"
        :src="url"
        fit="cover"
      ></el-image>
    </el-popover>
    <VideoPlay ref="dialogPlayVideo" src="videoUrl" />
  </div>
</template>

<script>
import VideoPlay from './components/VideoPlay'

export default {
  name: 'BtShow',
  data () {
    return {
      videoUrl: ''
    }
  },
  components: {
    VideoPlay
  },
  props: {
    type: {
      type: String // 素材类型image video
    },
    url: {
      type: String, // 素材资源地址
      default: ''
    },
    cover: {
      type: String, // 视频封面地址
      default: ''
    },
    showType: {
      type: String, // 展现形式 page open
      default: 'page'
    }
  },
  methods: {
    // 播放视频
    playVideo (url) {
      switch (this.showType) {
        case 'page':
          this.videoUrl = url
          this.$refs.dialogVisible = true
          break
        case 'open':
          window.open(url)
          break
      }
    }
  }
}
</script>

<style></style>

<template>
  <el-dialog title="视频" :visible.sync="dialogVisible" :width="width">
    <div style="font-size:0">
      <video
        :style="`width:100%;max-height:${height}px;`"
        class="video"
        controlsList="nodownload"
        :src="src"
        controls="controls"
      ></video>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: String
    },
    width: {
      type: String,
      default: '640'
    },
    height: {
      type: Number,
      default: 350
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  mounted () {}
}
</script>

<style scoped lang="less">
/deep/ .el-dialog__body {
  padding: 0;
}
</style>

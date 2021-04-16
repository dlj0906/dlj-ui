<template>
  <div id="app">
    <div>
      <mainHeader />
      <div
        v-if="!isIndex"
        class="container"
      >
        <sideNav class="nav" />
        <router-view class="view" />
      </div>
      <router-view
        v-else
        class="page"
      />
      <mainFooter v-if="!isIndex" />
    </div>
  </div>
</template>

<script>
import mainHeader from './components/header.vue'
import mainFooter from './components/footer.vue'
import sideNav from './components/side-nav.vue'

export default {
  name: 'App',
  components: {
    mainHeader,
    sideNav,
    mainFooter
  },
  data () {
    return {
      init: false,
      isIndex: true
    }
  },
  watch: {
    $route () {
      this.isIndex = this.$route.name === 'index'
    }
  },
  mounted () {
    //  这里模拟数据请求
    setTimeout(() => {
      this.init = true
    }, 250)
  }
}
</script>

<style lang="less" type="text/less">
  @import "./assets/less/index";

  .container {
    margin: 48px auto;
    width: 90%;
    background-color: #fff;
    box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
    .nav {
      float: left;
      width: 216px;
    }
    .view {
      float: left;
      width: calc(~'100% - 245px');
      padding: 32px 48px 48px;
      box-sizing: border-box;
    }
  }

  .container:after {
    content: "";
    clear: both;
    display: block;
  }
</style>

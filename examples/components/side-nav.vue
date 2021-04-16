<template>
  <div class="side-nav">
    <div
      v-for="(title, index) in (Object.keys(data))"
      :key="index"
      class="group-container"
    >
      <p class="side-nav-title">
        {{ title }}
      </p>
      <div
        v-for="(nav, idx) in data[title]"
        v-if="nav.desc"
        :key="idx"
        class="side-nav-items"
      >
        <router-link
          v-if="nav.name"
          :class="$route.name===nav.name ? 'active' : ''"
          :to="{name: nav.name}"
        >
          {{ nav.desc }}
        </router-link>
        <p
          v-else
          class="side-nav-group"
        >
          {{ nav.desc }}
        </p>
        <div
          v-for="(item, id) in nav.items"
          :key="id"
        >
          <router-link
            :to="{name: item.name}"
            :class="$route.name===item.name ? 'active' : ''"
            class="slid-nav-component"
          >
            {{ item.desc }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navConf from '../nav.config.json'
export default {
  data () {
    return {
      data: navConf
    }
  }
}
</script>
<style lang="less" type="text/less">
.side-nav{
  display: inline-block;
  margin: 32px 0;
  color: #3F536E;
  background-color: #fff;
  z-index: 99;
  padding-left: 24px;
  .group-container{
    margin-bottom: 32px;
  }
  .side-nav-title{
    font-size: 16px;
    color: #333;
    line-height: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    text-decoration: none;
    display: block;
    position: relative;
    transition: .15s ease-out;
    font-weight: 700;
  }
  .side-nav-items{
    font-size: 16px;
    font-weight: normal;
    line-height: 1.8;
    a{
      display: block;
      height: 40px;
      color: #444;
      line-height: 40px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 400;
    }
    .side-nav-group{
      font-size: 12px;
      color: #999;
      line-height: 26px;
      margin-top: 15px;
    }
    .active{
      color: #3FAAF5;
    }
  }
}
</style>

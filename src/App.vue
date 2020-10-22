<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  // 工具函数
  import { setCookie, getCookie } from '@/utils/'

  export default {
    components: {
      
    },
    props: {},
    data() {
      return {
      };
    },
    computed: {

    },

    created () {

    },
    mounted() {

    },
    methods: {
      
    }
  };
</script>

<style lang="scss">
  html {
    background-color: #fff;
    margin: 0 auto;

    body {
      background-color: #fff;

      #app {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased; // 字体抗锯齿效果，是字体更清晰（webkit内核）
        -moz-osx-font-smoothing: grayscale; // 字体抗锯齿效果，是字体更清晰（gecko内核）
        font-size: px(30);

      }

    }

  }
</style>

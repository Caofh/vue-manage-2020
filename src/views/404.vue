<template>
  <div class="not-found">
    <img :src="img_404" />
    <p>此功能正在快马加鞭赶来中……</p>
  </div>
</template>

<script>
  import Vue from 'vue';
  import img_404 from '../assets/img/404.png'

  export default {
    mounted: () => document.title = '404',
    data() {
      return {
        img_404: img_404,
        value: ''
      }
    }
  }
</script>

<style>
.not-found{
    position:absolute;
    top: -20px;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-align: center;
    font-size: 19px;
    color: gray;
    width: 300px;
    height: 300px;
}
</style>

<template>
  <div class="home-index">

    <div class="card-part c-flex-x-start">
      <el-card class="box-card c-flex-y-center">
        <div class="title">累计访问人数</div>
        <div class="content">{{data.total_uv || '0'}}</div>
      </el-card>
      <el-card class="box-card c-flex-y-center">
        <div class="title">累计回答数</div>
        <div class="content">{{data.total_answer_count || '0'}}</div>
      </el-card>
      <el-card class="box-card c-flex-y-center">
        <div class="title">累计动态数</div>
        <div class="content">{{data.total_moment_count || '0'}}</div>
      </el-card>
      <el-card class="box-card c-flex-y-center">
        <div class="title">累计评论数</div>
        <div class="content">{{data.total_reply_count || '0'}}</div>
      </el-card>
      <el-card class="box-card c-flex-y-center">
        <div class="title">昨日新增访问人数</div>
        <div class="content">{{data.yesterday_uv || '0'}}</div>
      </el-card>
      <el-card class="box-card c-flex-y-center">
        <div class="title">昨日新增回答数</div>
        <div class="content">{{data.yesterday_answer_count || '0'}}</div>
      </el-card>
      <el-card class="box-card c-flex-y-center">
        <div class="title">昨日新增动态</div>
        <div class="content">{{data.yesterday_moment_count || '0'}}</div>
      </el-card>
      <el-card class="box-card c-flex-y-center">
        <div class="title">昨日新增评论</div>
        <div class="content">{{data.yesterday_reply_count || '0'}}</div>
      </el-card>

    </div>

  </div>
</template>
<script>

import { getStatistic } from '@/api/pages/home/index'

export default {
  components: {
    
  },
  props: {},
  data() {
    return {
      data: {}, // 统计数据
    };
  },
  mounted () {

    // getStatistic().then((res) => {
    //   console.log(res)

    //   let data = res.data ? res.data : {}

    //   this.data = data

    // })

  },
  methods: {

  }
};
</script>
<style lang="scss">

  .home-index {

    .card-part {
      flex-wrap: wrap;

      .box-card {
        // width: 150px;
        // height: 80px;
        margin-right: 20px;


        .title {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .content {
          font-size: 40px;
          font-weight: 600;
        }
      }
    }

  }

</style>

<template>
  <div class="config-index">

    <el-form class="form-part" ref="form" :model="form" label-width="120px">

      <div class="title-part">
        <div class="title">首页配置</div>
        <div class="sub-title">Lite社区首页信息流展示分为2个区域：最新模块、个性模块。可以根据运营者的需求自定义配置展示逻辑。</div>
      </div>

      <div class="new-part">
        <div class="title">最新模块</div>

        <el-form-item class="new-show-count" label="最新展示条目">
          <div class="inner c-flex-x-start">
            <el-input class="text" v-model="form.newsCount" placeholder="请输入条目数字"></el-input>
          </div>
          <div class="tip">支持最新的动态 + 回答</div>
        </el-form-item>

      </div>

      <div class="self-part">
        <div class="title">个性化模块</div>

        <el-form-item class="new-show-count" label="已加入小组动态">
          <div class="inner c-flex-x-start">
            <el-input class="text" v-model="form.selfGroup" placeholder="请输入条目数字"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="new-show-count" label="关注人最新动态">
          <div class="inner c-flex-x-start">
            <el-input class="text" v-model="form.selfPerson" placeholder="请输入条目数字"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="new-show-count" label="关注人的回答">
          <div class="inner c-flex-x-start">
            <el-input class="text" v-model="form.selfAnswer" placeholder="请输入条目数字"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="new-show-count" label="关注问题的回答">
          <div class="inner c-flex-x-start">
            <el-input class="text" v-model="form.selfAnswer_question" placeholder="请输入条目数字"></el-input>
          </div>
        </el-form-item>

      </div>

    </el-form>

    <el-button @click="save" class="save" type="primary">保存</el-button>

  </div>
</template>
<script>

// 接口
// import { getStatistic } from '@/api/pages/home/index'

export default {
  components: {
    
  },
  props: {},
  data() {
    return {
      data: {}, // 统计数据

      form: {
        newsCount: '',
        selfGroup: '',
        selfPerson: '',
        selfAnswer: '',
        selfAnswer_question: '',
      }
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
    save () {
      console.log(this.form)
    }
  }
};
</script>
<style lang="scss">

  .config-index {
    padding: 30px 50px;

    .title-part {
      margin-bottom: 55px;
      
      .title {
        font-size: 24px;
        color: #000;
        margin-bottom: 20px;
        font-weight: 600;
      }

      .sub-title {
        font-size: 14px;
        color: #707070;
      }

    }

    .new-part {
      margin-bottom: 55px;
      
      .title {
        font-size: 24px;
        color: #000;
        margin-bottom: 20px;
        font-weight: 600;
      }

      .new-show-count {
        .el-form-item__label {
          text-align: left;
        }

        .inner {
          width: 250px;
        }

        .tip {
          font-size: 14px;
          color: #707070;
        }
      }

    }

    .self-part {
      margin-bottom: 55px;
      
      .title {
        font-size: 24px;
        color: #000;
        margin-bottom: 20px;
        font-weight: 600;
      }

      .new-show-count {
        .el-form-item__label {
          text-align: left;
        }

        .inner {
          width: 250px;
        }

        .tip {
          font-size: 14px;
          color: #707070;
        }
      }

    }

    .save {
      margin-left: 120px;
    }

  }

</style>

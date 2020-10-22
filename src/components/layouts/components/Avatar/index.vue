<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <el-avatar v-if="avatar" class="user-avatar" :src="avatar"></el-avatar>
      <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
      
      <div class="user-name">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="personalCenter">
        <i class="el-icon-user-solid"></i>
        个人中心
      </el-dropdown-item>
      <el-dropdown-item command="logout" divided>
        <i class="el-icon-error"></i>
        退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { mapGetters } from "vuex";

  // 工具函数
  import { pushPage, goPage } from '@/utils'

  // 配置信息
  import gateWay from '@/config/gateway.config.js'

  export default {
    name: "Avatar",
    computed: {
      ...mapGetters({
        avatar: "avatar",
        username: "username",
      }),
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case "logout":
            this.logout();
            break;
          case "personalCenter":
            this.personalCenter();
            break;
        }
      },
      personalCenter() {
        // this.$router.push("/personalCenter/index");

        pushPage(this, {
          name: 'personCenterIndex',
        })

      },
      logout() {
        this.$baseConfirm(
          "您确定要退出" + 'LITE版管理端' + "吗?",
          null,
          async () => {

            let logoutUrl = gateWay.host + '/logout'
            goPage(logoutUrl)

          }
        );
      },
    },
  };
</script>
<style lang="scss" scoped>
  .avatar-dropdown {
    padding: 0;
    height: 50px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .user-name {
      margin-left: 5px;
      position: relative;
      margin-left: 5px;
      font-weight: 600;
      cursor: pointer;
    }
  }
</style>

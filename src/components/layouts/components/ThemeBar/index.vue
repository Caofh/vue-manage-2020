<template>
  <span v-if="themeBar">
    <i
      :class="['el-icon-s-opportunity']"
      style="font-size: 20px; margin-right: 10px;"
      @click="handleOpenThemeBar"
    />

    <el-drawer
      title="主题配置"
      :visible.sync="drawerVisible"
      direction="rtl"
      append-to-body
      size="470px"
    >
      <el-scrollbar style="height: 94vh; overflow: hidden">
        <div class="el-drawer__body">
          <el-form ref="form" :model="theme">
            <el-form-item label="主题">
              <el-radio-group v-model="theme.name">
                <el-radio-button label="default">默认</el-radio-button>
                <el-radio-button label="bw">黑白模式</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button @click="handleSetDfaultTheme">恢复默认</el-button>
              <el-button type="primary" @click="handleSaveTheme">
                保存
              </el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-scrollbar>
    </el-drawer>
  </span>
</template>

<script>
import variables from "@/assets/css/styleExtra/vab.scss";
import { mapGetters } from "vuex";
export default {
  name: "ThemeBar",
  data() {
    return {
      drawerVisible: false,
      theme: {
        name: "default",
        layout: "",
        header: "",
        tagsBar: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      layout: "layout",
      header: "header",
      tagsBar: "tagsBar",
      themeBar: "themeBar",
    }),
  },
  mounted() {},
  created() {
    const theme = localStorage.getItem("lite-manage-theme");
    if (null !== theme) {
      this.theme = JSON.parse(theme);
    } 
    this.handleSetTheme()

  },
  methods: {
    handleIsMobile() {
      return document.body.getBoundingClientRect().width - 1 < 992;
    },
    handleOpenThemeBar() {
      this.drawerVisible = true;
    },
    handleSetTheme() {
      let { name, layout, header, tagsBar } = this.theme;
      localStorage.setItem(
        "lite-manage-theme",
        `{
            "name":"${name}",
            "layout":"${layout}",
            "header":"${header}",
            "tagsBar":"${tagsBar}"
          }`
      );

      document.getElementsByTagName(
        "body"
      )[0].className = `lite-manage-theme-${name}`;
      this.drawerVisible = false;

    },
    handleSaveTheme() {
      this.handleSetTheme();
    },
    handleSetDfaultTheme() {
      let { name } = this.theme;
      document
        .getElementsByTagName("body")[0]
        .classList.remove(`lite-manage-theme-${name}`);
      localStorage.removeItem("lite-manage-theme");
      this.$refs["form"].resetFields();
      Object.assign(this.$data, this.$options.data());
      this.theme.name = "default";
      this.theme.layout = this.layout;
      this.theme.header = this.header;
      this.theme.tagsBar = this.tagsBar;
      this.drawerVisible = false;
    },
    handleGetCode() {
      const url =
        "https://github.com/chuzhixin/vue-admin-beautiful/tree/master/src/views";
      let path = this.$route.path + "/index.vue";
      if (path === "/vab/menu1/menu1-1/menu1-1-1/index.vue") {
        path = "/vab/nested/menu1/menu1-1/menu1-1-1/index.vue";
      }
      if (path === "/vab/icon/awesomeIcon/index.vue") {
        path = "/vab/icon/index.vue";
      }
      if (path === "/vab/icon/remixIcon/index.vue") {
        path = "/vab/icon/remixIcon.vue";
      }
      if (path === "/vab/icon/colorfulIcon/index.vue") {
        path = "/vab/icon/colorfulIcon.vue";
      }
      if (path === "/vab/table/comprehensiveTable/index.vue") {
        path = "/vab/table/index.vue";
      }
      if (path === "/vab/table/inlineEditTable/index.vue") {
        path = "/vab/table/inlineEditTable.vue";
      }
      window.open(url + path);
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin right-bar {
  position: fixed;
  right: 0;
  z-index: $base-z-index;
  width: 60px;
  min-height: 60px;
  text-align: center;
  cursor: pointer;
  background: $base-color-blue;
  border-radius: $base-border-radius;

  > div {
    padding-top: 10px;
    border-bottom: 0 !important;

    &:hover {
      opacity: 0.9;
    }

    & + div {
      border-top: 1px solid $base-color-white;
    }

    p {
      padding: 0;
      margin: 0;
      font-size: $base-font-size-small;
      line-height: 30px;
      color: $base-color-white;
    }
  }
}

.theme-bar-setting {
  @include right-bar;

  top: calc((100vh - 110px) / 2);

  ::v-deep {
    svg:not(:root).svg-inline--fa {
      display: block;
      margin-right: auto;
      margin-left: auto;
      color: $base-color-white;
    }

    .svg-icon {
      display: block;
      margin-right: auto;
      margin-left: auto;
      font-size: 20px;
      color: $base-color-white;
      fill: $base-color-white;
    }
  }
}

.el-drawer__body {
  padding: 20px;
}
</style>
<style lang="scss">
.el-drawer__wrapper {
  outline: none !important;

  * {
    outline: none !important;
  }
}

.vab-color-picker {
  .el-color-dropdown__link-btn {
    display: none;
  }
}
</style>

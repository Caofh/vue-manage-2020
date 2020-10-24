<template>
  <div id="tags-bar-container" class="tags-bar-container">
    <el-tabs
      v-model="tabActive"
      type="card"
      class="tags-content"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :label="item.meta.title"
        :name="item.path"
        :closable="!isAffix(item)"
      >
      </el-tab-pane>
    </el-tabs>

    <el-dropdown @command="handleCommand">
      <span style="cursor: pointer;">
        更多操作
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="tags-more">
        <el-dropdown-item command="refreshRoute">
          刷新
        </el-dropdown-item>
        <el-dropdown-item command="closeOthersTags">
          关闭其他
        </el-dropdown-item>
        <el-dropdown-item command="closeLeftTags">
          关闭左侧
        </el-dropdown-item>
        <el-dropdown-item command="closeRightTags">
          关闭右侧
        </el-dropdown-item>
        <el-dropdown-item command="closeAllTags">
          关闭全部
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import path from "path";
  import { mapGetters } from "vuex";

  export default {
    name: "TagsBar",
    data() {
      return {
        affixTags: [],
        tabActive: "",

        // visitedRoutes: []

      };
    },

    computed: {
      ...mapGetters({
        visitedRoutes: "visitedRoutes",
        routes: "routes",
      }),
    },
    watch: {
      $route: {
        handler(route) {
          this.initTags();
          this.addTags();
          let tabActive = "";
          this.visitedRoutes.forEach((item, index) => {
            if (item.path === this.$route.path) {
              tabActive = item.path;
            }
          });
          this.tabActive = tabActive;
        },
        immediate: true,
      },
    },
    mounted() {
      //console.log(this.visitedRoutes);

      // let routes = this.$router.options.routes[0].children.filter(item => item.name)
      // this.visitedRoutes = routes

      // console.log(routes)
      
    },
    methods: {
      async handleTabRemove(tabActive) {
        let view;
        this.visitedRoutes.forEach((item, index) => {
          if (tabActive == item.path) {
            view = item;
          }
        });
        const { visitedRoutes } = await this.$store.dispatch(
          "tagsBar/delRoute",
          view
        );
        if (this.isActive(view)) {
          this.toLastTag(visitedRoutes, view);
        }
      },
      handleTabClick(tab) {
        const route = this.visitedRoutes.filter((item, index) => {
          if (tab.index == index) return item;
        })[0];
        if (this.$route.path !== route.path) {
          this.$router.push({
            path: route.path,
            query: route.query,
            fullPath: route.fullPath,
          });
        } else {
          return false;
        }
      },
      isActive(route) {
        return route.path === this.$route.path;
      },
      isAffix(tag) {
        return tag.meta && tag.meta.affix;
      },
      filterAffixTags(routes, basePath = "/") {
        let tags = [];
        routes.forEach((route) => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path);
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta },
            });
          }
          if (route.children) {
            const tempTags = this.filterAffixTags(route.children, route.path);
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags];
            }
          }
        });
        return tags;
      },
      initTags() {
        const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
        for (const tag of affixTags) {
          if (tag.name) {
            // this.$store.dispatch("addVisitedRoute", tag);
          }
        }
      },
      addTags() {
        const { name } = this.$route;
        if (name) {
          // this.$store.dispatch("addVisitedRoute", this.$route);
        }
        return false;
      },
      handleCommand(command) {
        switch (command) {
          case "refreshRoute":
            this.refreshRoute();
            break;
          case "closeOthersTags":
            this.closeOthersTags();
            break;
          case "closeLeftTags":
            this.closeLeftTags();
            break;
          case "closeRightTags":
            this.closeRightTags();
            break;
          case "closeAllTags":
            this.closeAllTags();
            break;
        }
      },
      async refreshRoute() {
        window.location.reload()
      },
      async closeOthersTags() {
        const view = await this.toThisTag();

        let routes = this.visitedRoutes.filter(item => item.name === view.name)
        this.$store.dispatch('setVisitedRoutes', routes)
      },
      async closeLeftTags() {
        const view = await this.toThisTag();

        let routes = []
        let curIndex = ''
        this.visitedRoutes.map((item, index) => {
          if (item.name === view.name) {
            curIndex =  String(index)
          }

          if (curIndex) {
            routes.push(item)
          }
        })

        this.$store.dispatch('setVisitedRoutes', routes)

      },
      async closeRightTags() {
        const view = await this.toThisTag();

        let routes = []
        let curIndex = ''
        this.visitedRoutes.map((item, index) => {

          if (item.name === view.name) {
            curIndex = String(index)
            routes.push(item)
          }

          if (!curIndex) {
            routes.push(item)
          }
        })

        this.$store.dispatch('setVisitedRoutes', routes)

      },
      async closeAllTags() {
        this.$store.dispatch('setVisitedRoutes', [])
      },
      toLastTag(visitedRoutes, view) {
        const latestView = visitedRoutes.slice(-1)[0];
        if (latestView) {
          this.$router.push(latestView);
        } else {
          this.$router.push("/");
        }
      },
      async toThisTag() {
        const view = this.visitedRoutes.filter((item, index) => {
          if (item.path === this.$route.fullPath) {
            return item;
          }
        })[0];
        if (this.$route.path !== view.path) this.$router.push(view);
        return view;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tags-bar-container {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    height: $base-tags-bar-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    user-select: none;
    background: $base-color-white;
    border-top: 1px solid #f6f6f6;

    .tags-content {
      width: calc(100% - 90px);
      height: $base-tag-item-height;

      ::v-deep {
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          height: $base-tag-item-height;
          line-height: $base-tag-item-height;
        }

        .el-tabs__header {
          border-bottom: 0;

          .el-tabs__nav {
            border: 0;
          }

          .el-tabs__item {
            box-sizing: border-box;
            height: $base-tag-item-height;
            margin-right: 5px;
            line-height: $base-tag-item-height;
            border: 1px solid $base-border-color;
            border-radius: $base-border-radius;

            &.is-active {
              color: $base-color-white;
              background: $base-color-blue;
              border: 1px solid $base-color-blue;
            }

            .el-icon-close {
              position: relative;
              top: -1px;
              right: -2px;
              width: 0;
              height: 14px;
              overflow: hidden;
              font-size: 12px;
              line-height: 14px;
              vertical-align: middle;
              transform-origin: 100% 50%;
            }

            /* &:nth-child(2) {
            padding: 0 20px;
            &:hover {
              padding: 0 13px;
            }
          } */
          }
        }
      }
    }
  }
</style>

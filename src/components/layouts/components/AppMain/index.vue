<template>
  <section class="app-main-container">

    <!-- <github-corner v-if="githubCorner"></github-corner> -->

    <vab-keel v-if="show" class="vab-keel">
      <vab-keel-heading :img="true" />
      <vab-keel-text :lines="7" />
      <vab-keel-heading :img="true" />
      <vab-keel-text :lines="6" />
      <vab-keel-heading :img="true" />
      <vab-keel-text :lines="8" />
    </vab-keel>

    <transition-group mode="out-in" name="fade-transform">
      
      <keep-alive
        v-if="routerView && $route.meta.keepAlive"
        :include="cachedRoutes"
        :max="99"
      >
        <router-view :key="key" class="app-main-height" />
      </keep-alive>
      <router-view v-else-if="newPage" :key="key" class="app-main-height" />

    </transition-group>

  </section>
</template>

<script>
  import { VabKeel, VabKeelHeading, VabKeelText } from "./components/vabKeel";
  import { mapGetters } from "vuex";
  // import GithubCorner from "../GithubCorner";

  export default {
    name: "AppMain",
    components: {
      VabKeel,
      VabKeelHeading,
      VabKeelText,
    },
    data() {
      return {
        show: false,
        fullYear: new Date().getFullYear(),
        routerView: true,
        // githubCorner,
        
        newPage: true, // 新页面显示标识

      };
    },
    computed: {
      ...mapGetters({
        visitedRoutes: "visitedRoutes",
        device: "device",
        skeleton: "skeleton",
      }),
      cachedRoutes() {
        const cachedRoutesArr = [];
        this.visitedRoutes.forEach((item) => {
          if (!item.meta.noKeepAlive) {
            cachedRoutesArr.push(item.name);
            this.handleSkeleton();
          }
        });
        return cachedRoutesArr;
      },
      key() {
        return this.$route.path;
      },
    },
    watch: {
      $route: {
        handler(route) {
          if ("mobile" === this.device) {
            // this.$store.dispatch("settings/foldSideBar");
          }

          this.newPage = false
          setTimeout(() => {
            this.newPage = true
          }, 200)
        },
        immediate: true,
      },
    },
    created() {
      //重载所有路由
      this.$baseEventBus.$on("reloadRouterView", () => {
        this.routerView = false;
        this.$nextTick(() => {
          this.routerView = true;
          this.handleSkeleton();
        });
      });
    },
    mounted() {
      this.handleSkeleton();
    },
    methods: {
      handleSkeleton() {
        if (this.skeleton) {
          this.show = true;
          setTimeout(() => {
            this.show = false;
          }, 200);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .app-main-container {
    position: relative;
    width: 100%;
    min-height: calc(100vh - 155px);
    overflow: hidden;
    .vab-keel {
      margin: $base-padding;
    }
    .app-main-height {
      // min-height: $base-app-main-height;
      min-height: calc(100vh - 155px);
    }

    .footer-copyright {
      min-height: 55px;
      line-height: 55px;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      border-top: 1px dashed $base-border-color;
    }
  }
</style>

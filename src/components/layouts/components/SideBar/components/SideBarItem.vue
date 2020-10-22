<template>
  <component
    :is="menuComponent"
    v-if="!newItem.hidden"
    :item="newItem"
    :full-path="fullPath"
    :route-children="routeChildren"
  >
    <template v-if="newItem.children && newItem.children.length">
      <side-bar-item
        v-for="route in newItem.children"
        :key="route.path"
        :full-path="handlePath(route.path)"
        :item="route"
      ></side-bar-item>
    </template>

  </component>
</template>

<script>
  import Submenu from "./Submenu";
  import MenuItem from "./MenuItem";
  import { isExternal } from "@/utils/extra/validate";
  import path from "path";

  // 工具函数
  // import { getAuth } from '@/utils/'

  export default {
    name: "SideBarItem",
    data() {
      this.onlyOneChild = null;
      return {
        newItem: {}
      };
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      fullPath: {
        type: String,
        default: "",
      },
    },
    components: { Submenu, MenuItem },
    watch: {

      item: {
        handler(newValue, oldValue) {

          // let name = newValue.name || ''
          // let isSuper = getAuth()

          // // 权限管理
          // if ((name == 'auth' || 
          //      name == 'data' || 
          //      name == 'home' ||
          //      name == 'qa' ||
          //      name == 'user'
          //     ) && isSuper != 1) {
          //   newValue.hidden = true
          // }

          this.newItem = newValue

        },
        immediate: true,
      },
    },
    computed: {
      menuComponent() {

        if (
          this.handleChildren(this.item.children, this.item) &&
          (!this.routeChildren.children ||
            this.routeChildren.notShowChildren) &&
          !this.item.alwaysShow
        ) {

          return "MenuItem";
        } else {
          return "Submenu";
        }

      },


    },
    methods: {
      handleChildren(children = [], parent) {

        if (children === null) children = [];
        const showChildren = children.filter((item) => {
          if (item.hidden) {
            return false;
          } else {
            this.routeChildren = item;
            return true;
          }
        });
        if (showChildren.length === 1) {
          return true;
        }

        if (showChildren.length === 0) {
          this.routeChildren = {
            ...parent,
            path: "",
            notShowChildren: true,
          };
          return true;
        }
        return false;
      },
      handlePath(routePath) {
        if (isExternal(routePath)) {
          return routePath;
        }
        if (isExternal(this.fullPath)) {
          return this.fullPath;
        }
        return path.resolve(this.fullPath, routePath);
      },

    },
  };
</script>

<style lang="scss" scoped>
  .vab-nav-icon {
    margin-right: 4px;
  }

  ::v-deep {
    .el-tag {
      float: right;
      height: 16px;
      padding-right: 4px;
      padding-left: 4px;
      margin-top: calc((#{$base-menu-item-height} - 16px) / 2);
      line-height: 16px;
      border: 0;
    }
  }
</style>

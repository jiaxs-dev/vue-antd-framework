<template>
  <a-layout class="admin-layout">
    <a-layout-header class="admin-layout-header">

      <div :class="['admin-header-wide', 'side']">
        <router-link to="/" :class="['logo']">
          <img width="32" src="../assets/image/KDpgvguMpGfqaHPjicRK.svg"/>
          <h1>大数据可视化中心</h1>
        </router-link>
        <div :class="['admin-header-right']">
          <HeaderAvatar class="header-item"></HeaderAvatar>
        </div>
      </div>

    </a-layout-header>
    <a-layout>
      <SideMenu></SideMenu>
      <a-layout>
        <a-layout-content>
          <router-view/>
        </a-layout-content>
        <a-layout-footer class="admin-layout-footer">
          <PageFooter></PageFooter>
        </a-layout-footer>
      </a-layout>

    </a-layout>
  </a-layout>
</template>

<script>
  import PageFooter from "../components/layout/PageFooter";
  import HeaderAvatar from "../components/layout/HeaderAvatar";
  import SideMenu from "../components/layout/SideMenu";

  export default {
    name: "Index",
    components: {
      PageFooter,
      HeaderAvatar,
      SideMenu
    }
  }
</script>

<style lang="less" scoped>
  .admin-layout {
    height: 100%;
  }

  .admin-layout-header {
    padding: 0 !important;
  }

  .admin-layout-footer {
    padding: 0 !important;
  }

  .admin-header-wide {
    &.head {
      max-width: 1400px;
      margin: auto;
    }

    &.side {
      padding-right: 12px;
    }

    .logo {
      height: 64px;
      line-height: 64px;
      vertical-align: top;
      display: inline-block;
      padding: 0 10px 0 10px;
      cursor: pointer;
      font-size: 18px;


      img {
        vertical-align: middle;
      }

      h1 {
        display: inline-block;
        font-size: 18px;
        padding-left: 10px;
        font-weight: 600;
        vertical-align: top;
        color: #f0f0f0;
      }
    }

    .admin-header-right {
      float: right;
      display: flex;
      color: inherit;

      .header-item {
        color: inherit;
        padding: 0 12px;
        cursor: pointer;
        align-self: center;

        a {
          color: inherit;

          i {
            font-size: 16px;
          }
        }
      }
    }

  }

</style>

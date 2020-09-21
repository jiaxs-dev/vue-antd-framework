<template>
  <div class="footer">
    <div class="links">
      <a target="_blank" :key="index" :href="item.link ? item.link : 'javascript: void(0)'"
         v-for="(item, index) in linkList">
        <a-icon v-if="item.icon" :type="item.icon"/>{{item.name}}
      </a>
    </div>
    <div class="copyright">
      Copyright<a-icon type="copyright"/>{{copyright}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageFooter',
    data() {
      return {
        linkList: [
          {link: 'https://cn.vuejs.org', name: 'vue'},
          {link: 'https://ant.design', icon: 'ant-design'},
          {link: 'https://github.com/jiaxs-dev/vue-antd-framework', icon: 'github'}
        ],
        copyright: '大数据可视化中心'
      };
    }
  }
</script>

<style lang="less" scoped>
  .footer {
    padding: 0 16px;
    margin: 20px 0 20px;
    text-align: center;

    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }

    .links {
      margin-bottom: 8px;

      a:not(:last-child) {
        margin-right: 40px;
      }

      a {
        color: rgba(0, 0, 0, 0.45);
        -webkit-transition: all .3s;
        transition: all .3s;
      }
    }
  }
</style>

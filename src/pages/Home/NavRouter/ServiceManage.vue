<template>
  <div class="service-manage home-right-common">
    <h2 class="title">服务管理</h2>
    <div class="service-manage-wrap">
      <ServiceCategory />
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ServiceCategory from 'pages/Home/Components/ServiceManage/ServiceCategory'
export default {
  data () {
    return {
    };
  },

  computed: {},

  mounted(){},

  methods: {},

  components: {
    ServiceCategory
  },
}

</script>
<style lang='less' scoped>

</style>
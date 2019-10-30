<template>
  <div class="admin home-right-common">
    <h2 class="title">用户管理</h2>
    <div class="admin-wrap">
      <Intention ></Intention>
      <!-- <Audit ></Audit>
      <AllUser ></AllUser> -->
    </div>
  </div>
</template>

<script>
import Pagination from "src/common/Pagination";
import Intention from './Intention'
import Audit from './Audit'
import AllUser from './AllUser'
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      // 需要加入验证
      // tableHead 需要传递给子组件
      // 子组件整体高度需要传递 可以不传
      // 合并行数需要传递
    };
  },

  computed: {
  },

  mounted() {
    this.getApplyOpenServiceUserList()
  },

  methods: {
    ...mapActions(['getApplyOpenServiceUserList'])
  },

  components: {
    Intention,
 
    Pagination,Audit,AllUser
  }
};
</script>
<style lang='less' scoped>

</style>
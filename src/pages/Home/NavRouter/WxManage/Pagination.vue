<template>
  <div class="pagination">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="currentTableList.length?currentTableList.length:0"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentPage: 1
    };
  },

  computed: {
    ...mapState({
      currentTableList: state => state.wxUserManage.currentTableList
    })
  },

  mounted() {},
  methods: {
    handleCurrentChange(page) {
      this.$emit("changeCurrentPage", page - 1);
      console.log(`当前页: ${page}`);
    }
  },

  components: {}
};
</script>
<style lang='less' scoped>
.pagination {
  margin-top: 0.2rem;
  .el-pagination {
    text-align: center;
  }
}
</style>
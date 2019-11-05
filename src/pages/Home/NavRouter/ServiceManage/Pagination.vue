<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="getMaxService"
      :page-size.sync="activeServiceInfo.size"
      :current-page.sync="currentPage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      currentPage:1
    };
  },

  computed: {
    ...mapState(['activeServiceInfo']),
    ...mapGetters(['getMaxService','checkLocalServiceData'])

  },

  mounted() {
  },

  methods: {
    ...mapActions(['getGroupItemInfo','saveServiceInfo','modiShowCurrent']),
   
    //选中某个分页点击后的回调
    handleCurrentChange(page) {
      let {id,size}=this.activeServiceInfo
      page--;
      this.saveServiceInfo({id,size,page})
      let {othersPage} = this.checkLocalServiceData
      // console.log(serviceAry)
      //判断是发请求还是从本地读取
      if (othersPage.length>0) {
        this.modiShowCurrent(othersPage[0].allPage[page])
      }else{
        this.getGroupItemInfo({id,page,size,examineType:'GROUP'})
        console.log(`当前页: ${page}`);
      }
     
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
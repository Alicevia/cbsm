<template>
  <div class="custom-menus">
    <el-table
      :data="tableData"
     
      :border="true"
      :header-cell-style="thead"
      height="400"
    >
      <el-table-column  fixed prop="date" width="110" label="父级菜单"></el-table-column>
      <el-table-column  prop="name" width="110" label="子级菜单"></el-table-column>
      <el-table-column  prop="province" width="110" label="菜单关键词"></el-table-column>
      <el-table-column  prop="city" width="250" label="外随URL"></el-table-column>
      <el-table-column prop="address" label="排序" width="60"></el-table-column>
      <el-table-column prop="zip" label="操作" width="140">
        <template slot-scope="scope">
          <el-button class="menus-btn" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button class="menus-btn" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thead: {
        backgroundColor: "#00B7C5",
        color: "white",
        textAlign: "center",
        height:'50px',
       
        
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "1",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "1",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "1",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: 1,
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "1",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "1",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "1",
          zip: 200333
        }
      ]
    };
  },

  computed: {},

  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },

  components: {}
};
</script>
<style lang='less' scoped>
.custom-menus {
  margin-top: 0.2rem;
  .menus-btn {
    width: 50px;
    text-align: center;
    padding: 0;
    padding: 5px 0;
    
  }
}
</style>
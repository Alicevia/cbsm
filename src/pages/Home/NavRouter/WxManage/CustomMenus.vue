<template>
  <div class="custom-menus">
    <el-table
      :data="weChatMenus"
      :border="true"
      :header-cell-style="theadClass"
      height="400"
      :tree-props="{children: 'childrenResponse',hasChildren: 'hasChildren'}"
      row-key="id"
      default-expand-all
      :row-class-name="noWorkRowClassName"
    >
      <el-table-column prop="name" width="120" label="父级菜单"></el-table-column>
      <el-table-column prop="childrenName" width="120" label="子级菜单"></el-table-column>
      <el-table-column prop="keyWord" width="120" label="菜单关键词"></el-table-column>
      <el-table-column prop="url" width="auto" label="外随URL"></el-table-column>
      <el-table-column prop="sequence" label="排序" width="60"></el-table-column>
      <el-table-column prop="zip" label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            class="menus-btn"
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            class="menus-btn"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      theadClass: {
        backgroundColor: "#00B7C5",
        color: "white",
        textAlign: "center",
        height: "40px"
      },
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },

  computed: {
    ...mapState(["weChatMenus"])
  },

  mounted() {},

  methods: {
    noWorkRowClassName(row, rowIndex){
      if (rowIndex===1) {
        console.log(row)

        return 'nowork'
      }
    },
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
 .el-table .nowork{
    background-color: rgb(194, 10, 65);
  }
.custom-menus {
  margin-top: 0.1rem;
  .menus-btn {
    width: 50px;
    text-align: center;
    padding: 0;
    padding: 5px 0;
  }
 
}
</style>
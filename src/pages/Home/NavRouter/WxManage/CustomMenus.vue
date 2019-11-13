<template>
  <div class="custom-menus">
    <div style="overflow:hidden">
      <el-button type="primary" class="wx-menus-btn" size="small" @click="openMenuDialog">菜单添加</el-button>
    </div>
    <el-table
      :data="weChatMenus"
      :border="true"
      :header-cell-style="theadClass"
      height="400"
      :tree-props="{children: 'childrenResponse'}"
      row-key="id"
      default-expand-all
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
    <WxMenusDialog ref="menuDialog" :editMenu="editMenu"></WxMenusDialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WxMenusDialog from "./WxMenusDialog";

export default {
  data() {
    return {
      editMenu: {},
      theadClass: {
        backgroundColor: "#00B7C5",
        color: "white",
        textAlign: "center",
        height: "40px"
      }
    };
  },

  computed: {
    ...mapState(["weChatMenus"])
  },
  mounted() {
    
  },
  methods: {
    ...mapActions(['deleteUserWeChatMenu']),
    tableRowClassName({ row, rowIndex }) {
      if (!row.isDisplay) {
        // console.log(row, rowIndex);
        return "nowork";
      }
      return "";
    },
    openMenuDialog() {
      this.editMenu = {};
      this.$refs["menuDialog"].showOrHide();
    },
    // 创建或修改最新的用户菜单
    createOrEditMenu() {},
    // 处理每行数据
    handleEdit(index, row) {
      this.$refs["menuDialog"].showOrHide();
      this.editMenu = row;
      console.log(index, row);
    },
    // 删除微信的一行
    handleDelete(index, row) {
      this.deleteUserWeChatMenu(row)
      console.log(index, row);
    }
  },

  components: { WxMenusDialog }
};
</script>
<style lang='less' scoped>
/deep/.el-table .nowork {
  background-color: #c0c4cc;
}

.custom-menus {
  margin-top: 0.1rem;
  .menus-btn {
    width: 50px;
    text-align: center;
    padding: 0;
    padding: 5px 0;
  }
  .wx-menus-btn {
    float: right;
    margin-bottom: 0.1rem;
  }
}
</style>
<template>
  <div>
    <el-dialog
      title="菜单编辑"
      :close-on-click-modal="false"
      :before-close="showOrHide"
      center
      :visible="dialogFormVisible"
      :destroy-on-close="true"
      @open="updateEditMenu"
    >
      <el-form :model="ruleForm" :rules="rules" ref="wxMenus" size="mini" label-width="30%">
        <el-form-item label="父级菜单">
          <el-select v-model="ruleForm.parentId">
            <el-option label="请选择菜单" :value="0"></el-option>
            <el-option
              v-for="(item,index) in weChatMenus"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单名称" prop="name">
          <el-input class="wx-input" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <!-- <el-form-item label="菜单名称" prop="childrenName" v-else>
          <el-input class="wx-input" v-model="ruleForm.name"></el-input>
        </el-form-item> -->

        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="ruleForm.menuType">
            <el-radio-button label="CLICK"></el-radio-button>
            <el-radio-button label="VIEW"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="ruleForm.menuType==='CLICK'" label="菜单关键字" prop="keyWord">
          <el-input class="wx-input" v-model="ruleForm.keyWord"></el-input>
        </el-form-item>
        <el-form-item v-else label="外随URL" prop="url">
          <el-input class="wx-input" v-model="ruleForm.url"></el-input>
        </el-form-item>

        <el-form-item label="显示" prop="isDisplay">
          <el-radio-group v-model="ruleForm.isDisplay">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sequence">
          <el-select v-model="ruleForm.sequence" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input class="wx-input" v-model="ruleForm.sequence"></el-input> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showOrHide">取 消</el-button>
        <el-button size="mini" type="primary" @click="createMenus">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Message } from "element-ui";
export default {
  props: {
    // dialogFormVisible: {
    //   type: Boolean,
    //   default: function() {
    //     return false;
    //   }
    // },
    editMenu: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      options: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        },
        {
          value: 5,
          label: "5"
        }
      ],
      dialogFormVisible: false,
      ruleForm: {
        parentId: 0,
        name: "",
        menuType: "CLICK",
        url: "",
        keyWord: "",
        isDisplay: "是",
        sequence: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 8, message: "4个汉字以内", trigger: "blur" }
        ],
        childrenName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 14, message: "7个汉字以内", trigger: "blur" }
        ],
        sequence: { required: true, message: "不能为空", trigger: "blur" },
        url: { required: true, message: "url不能为空", trigger: "blur" },
        keyWord: { required: true, message: "keyWord不能为空", trigger: "blur" }
      }
    };
  },

  computed: {
    ...mapState(["weChatMenus"])
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["updateUserWeChatMenu"]),
    // 判断是否传入editMen对象
    checkEditMenu(editMenu) {
      // let editMenu = JSON.parse(JSON.stringify(this.editMenu));
      // if (editMenu.childrenResponse) {
      //   delete editMenu.childrenResponse;
      // }
      let ary = Object.keys(editMenu);
      editMenu = JSON.parse(JSON.stringify(editMenu));
      // console.log(editMenu);
      return { ary, editMenu };
    },
    // 新建更新wx菜单
    createMenus() {
      this.$refs["wxMenus"].validate(valid => {
        // console.log(valid)不通过为false
        if (!valid) return;
        let menuRequest = JSON.parse(JSON.stringify(this.ruleForm));
        if (this.ruleForm.isDisplay === "是") {
          menuRequest.isDisplay = true;
        } else {
          menuRequest.isDisplay = false;
        }
        this.updateUserWeChatMenu(menuRequest).then(() => {
          Message.success("更新菜单成功");
          this.showOrHide();
        });
      });
    },

    updateEditMenu() {
      let { ary, editMenu } = this.checkEditMenu(this.editMenu);
      if (ary.length !== 0) {
        editMenu.isDisplay
          ? (editMenu.isDisplay = "是")
          : (editMenu.isDisplay = "否");
        this.ruleForm = editMenu;
      } else {
        this.ruleForm = {
          parentId: 0,
          name: "",
          menuType: "CLICK",
          url: "",
          keyWord: "",
          isDisplay: "是",
          sequence: ""
        };
      }
    },
    showOrHide() {
      this.dialogFormVisible = !this.dialogFormVisible;
    }
  },

  components: {}
};
</script>
<style lang='less' scoped>
// .demo-ruleForm{
//   text-align: center;
// }

.wx-input {
  width: 3rem;
}
</style>
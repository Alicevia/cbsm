<template>
  <div>
    <el-dialog
      title="菜单编辑"
      :close-on-click-modal="false"
      :before-close="showOrHide"
      center
      :visible.sync="dialogFormVisible"
      custom-class='wx-dialog'
     
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        size="mini"
      >
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
          <el-input  class="wx-input" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="ruleForm.menuType">
            <el-radio-button label="CLICK"></el-radio-button>
            <el-radio-button label="VIEW"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="外随URL" prop="url">
          <el-input class="wx-input" v-model="ruleForm.url"></el-input>
        </el-form-item>

        <el-form-item label="显示" prop="isDisplay">
          <el-radio-group v-model="ruleForm.isDisplay">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序"  prop="sequence">
          <el-input  class="wx-input" v-model="ruleForm.sequence"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showOrHide">取 消</el-button>
        <el-button type="primary" @click="showOrHide">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {
      wxdialog:'wx-dialog',
      ruleForm: {
        parentId:0,
        name: "",
        menuType: "CLICK",
        url: "",
        isDisplay:'是',
        sequence: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },

  computed: {
    ...mapState(["weChatMenus"])
  },

  mounted() {},

  methods: {
    showOrHide() {
      this.$emit("changeMenuDialog");
    }
  },

  components: {}
};
</script>
<style lang='less' scoped>
// .demo-ruleForm{
//   text-align: center;
// }

.el-dialog .wx-dialog {
  box-sizing: content-box; 
  padding: .6rem;
}
.wx-input {
  width: 3rem
}
</style>
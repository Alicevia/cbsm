<template>
  <div class="wx-user-manage">
    <div class="wx-tip">
      <h4>操作提示</h4>
      <ul>
        <li>用户管理：显示已经关注微信公众号的用户信息。</li>
        <li>在对用户进行发送消息操作之前，请及时点击更新按钮，以便同步微信公众号平台的用户分组（标签）与数量。</li>
        <li>发送客服消息，可以单独发送微信消息给微信用户（只有48小时内和公众号有过互动的粉丝才能接收到信息，否则会发送失败）</li>
      </ul>
    </div>
    <div class="user-manage">
      <div class="user-operate">
        <div class="user-transport">
          <span>将选中的粉丝转移到分组中</span>
          <el-select v-model="value" placeholder="请选择" style="width:1rem" size="mini">
            <el-option label="未分组" value="cancel"></el-option>
            <el-option v-for="item in labelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            <el-option label="黑名单" value="black"></el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="changeUsersLabel">转移</el-button>
        </div>
        <div class="user-search">
          <el-input v-model="search" placeholder="请输入昵称、省、市搜索" size="mini"></el-input>
          <el-button type="primary" size="mini">搜索</el-button>
        </div>
      </div>
      <div class="user-show">
        <div class="user-table">
          <el-table
            ref="multipleTable"
            :data="showCurrentTableList[currentPage]"
            tooltip-effect="dark"
            :border="true"
            max-height="400px"
            :height="400"
            :header-cell-style="theadClass"
            :cell-style="{textAlign:'center'}"
            size="mini"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="头像" width="80">
              <template slot-scope="scope">
                <img :src="scope.row.headimgurl" alt class="avatar" />
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="125"></el-table-column>
            <el-table-column prop="city" label="省(直辖市)" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="subscribe_time" label="关注时间" width="120">
              <template slot-scope="scope">{{scope.row.subscribe_time|formatTime}}</template>
            </el-table-column>
            <el-table-column prop="openid" label="绑定用户" width="140"></el-table-column>
            <el-table-column prop="name" label="操作" width="80">
              <i
                :style="{fontSize:'30px',color:'#00B7C5',cursor:'pointer'}"
                class="el-icon-s-comment"
              ></i>
            </el-table-column>
          </el-table>
        </div>
        <div class="user-update">
          <div class="update">
            <el-button type="primary" size="mini" @click="updateAllMessage">更新</el-button>
            <el-button type="primary" size="mini" @click="addLabel">添加</el-button>
          </div>
          <ul class="group">
            <!-- <li class="item">
              <span class="text" @click="getAllAttentionUser">全部用户</span>
              <span class="numb">{{allAttentionUserList.length}}</span>
            </li>-->
            <li :class="classFlag==='未分组'?'item active':'item'">
              <span class="text" @click="changeCurrentToUnGroup" >未分组</span>
              <span class="numb">{{unGroupUserList.length}}</span>
            </li>

            <li :class="classFlag===item.id?'item active':'item'"
             v-for="(item) in labelList" :key="item.id">
              <span class="text" @click="getLabelUser({tagid:item.id})">{{item.name}}</span>
              <span class="numb">{{item.count?item.count:0}}</span>
              <el-button
                v-if="item.name!=='星标组'"
                class="group-btn"
                type="primary"
                @click="changeLabelDialog(item)"
                size="mini"
              >编辑</el-button>
            </li>

            <li  :class="classFlag==='黑名单'?'item active':'item'">
              <span class="text" @click="changeToBlackList">黑名单</span>
              <span class="numb">{{blackList.length}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Pagination @changeCurrentPage="changeCurrentPage"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../Pagination";
import { mapActions, mapState, mapGetters } from "vuex";
import { Message } from 'element-ui';
export default {
  data() {
    return {
      classFlag:'未分组',
      currentPage: 0,
      theadClass: {
        backgroundColor: "#00B7C5",
        color: "white",
        textAlign: "center",
        height: "40px"
      },
      search: "",
      value: "",
      tableData: [
        {
          date: "2016-",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },

  computed: {
    ...mapState({
      labelList: state => state.wxUserManage.labelList,
      blackList: state => state.wxUserManage.blackList,
      allAttentionUserList: state => state.wxUserManage.allAttentionUserList
    }),
    ...mapGetters(["showCurrentTableList", "unGroupUserList"])
  },
  created() {
    this.getWeChatLabel();
    this.getAllAttentionUser({ flag: "init" }).then(() => {
      this.showUnGroup();
    });
    this.getBlackListUser({ flag: "init" });
  },
  mounted() {},

  methods: {
    ...mapActions([
      "getWeChatLabel",
      "getAllAttentionUser",
      "getLableGategoryUser",
      "getBlackListUser",
      "addWeChatLabel",
      "modiWeChatLabel",
      "showUnGroup",
      "batchUserLabel",
      'batchCancelUserLabel'
    ]),
    changeToBlackList(){
      this.getBlackListUser({ flag: '' })
      this.classFlag='黑名单'
    },
    changeCurrentPage(page) {
      this.currentPage = page;
    },
    // 对选中的行进行操作
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 获取到选中数组
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let newAry = this.multipleSelection;
      newAry = newAry.map(item => {
        return item.openid;
      });
      this.payload = { openid_list: newAry };
      console.log(this.payload);
    },
    // 批量操作用户的标签
    changeUsersLabel() {
      let { payload, value,classFlag } = this;
      if (classFlag===value||(classFlag==='未分组'&& value==='cancel')||(classFlag==='黑名单'&& value==='black')) {
        Message.warning('你已经在这分组内')
        return
      }
      if (value === "black") {
        console.log(typeof classFlag)
        if (typeof classFlag === 'number') {
          Message.warning('黑名单只能被取消或者添加')
          return 
        }
      } else if (value === "cancel") {
        payload.tagid = classFlag;
        this.batchCancelUserLabel(payload).then(()=>{
          this.updateAllMessage()
        });
      } else {

        payload.tagid = value;
        this.batchUserLabel(payload).then(()=>{
          this.updateAllMessage()
        });
      }
      console.log(this.value);
    },
    // 获取标签下的用户
    getLabelUser(tagid) {
      this.getLableGategoryUser(tagid);
      this.classFlag=tagid.tagid
    },
    // 添加标签
    addLabel() {
      this.$prompt("请输入标签名", "添加标签", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4e00-\u9fa5]{1,10}$/,
        inputErrorMessage: "标签名为1-10个汉字"
      })
        .then(({ value }) => {
          this.addWeChatLabel({ tag: { name: value } });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 修改标签
    changeLabelDialog(item) {
      let { id, name } = item;
      console.log(item);
      this.$prompt("请修改标签名", "修改标签", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4e00-\u9fa5]{1,10}$/,
        inputErrorMessage: "标签名为1-10个汉字",
        inputValue: name
      })
        .then(({ value }) => {
          this.modiWeChatLabel({ tag: { id, name: value } });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 展示未分组
    changeCurrentToUnGroup() {
      this.showUnGroup();
      this.classFlag = '未分组'
    },
    // 手动更新获取最新的信息
    updateAllMessage() {
      this.getWeChatLabel();
      this.getAllAttentionUser({ flag: "init" }).then(() => {
        this.showUnGroup();
      });
      this.getBlackListUser({ flag: "init" });
    }
  },
  filters: {
    formatTime(time) {
      return new Date(time * 1000).toLocaleDateString();
    }
  },

  components: { Pagination }
};
</script>
<style lang='less' scoped>
.wx-user-manage {
  height: 2rem;
  position: relative;
  width: 8.86rem;
  margin-left: -0.43rem;
  .wx-tip {
    // min-width: 10rem;
    border: 1px dashed #1b9ad5;
    padding: 0.1rem 0.3rem;
    border-radius: 0.1rem;
    line-height: 1.5;
    margin-bottom: 0.1rem;
    h4 {
      color: #1b9ad5;
      margin-left: -0.1rem;
    }
  }
  .user-manage {
    .user-operate {
      margin-top: 0.2rem;
      margin-bottom: 0.1rem;
      display: flex;
      justify-content: space-between;
      .user-search {
        display: flex;
      }
    }
    .user-show {
      display: flex;
      .user-table {
        width: 7rem;
        .table-td {
          text-align: center;
        }
        .avatar {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .user-update {
        margin-left: 0.1rem;
        flex: 1;
        align-self: flex-start;
        box-sizing: border-box;

        border: 1px solid rgb(235, 238, 245);
        .update {
          display: flex;
          border: 1px solid rgb(235, 238, 245);
          line-height: 0.4rem;
          padding: 0.06rem;
        }
        .group {
          font-size: 0.14rem;
          .item {
            border: 1px solid rgb(235, 238, 245);
            line-height: 0.35rem;
            padding-left: 0.05rem;
            &:hover {
              background-color: rgb(235, 238, 245);
            }
            &.active{
              background-color: rgb(235, 238, 245);

            }
            .text {
              width: 0.6rem;
              display: block;
              float: left;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              cursor: pointer;
            }
            .numb {
              background-color: red;
              border-radius: 0.1rem;
              display: inline-block;
              line-height: 1;
              text-align: center;
              min-width: 0.2rem;
              margin-left: 0.02rem;
              color: white;
            }
            .group-btn {
              margin-top: 0.07rem;
              float: right;
              margin-right: 0.01rem;
              width: 0.4rem;
              height: 0.2rem;
              text-align: center;
              padding: 0;
            }
          }
        }
      }
    }
  }
}
</style>
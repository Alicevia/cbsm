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
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" size="mini">转移</el-button>
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
            height="400"
            :header-cell-style="theadClass"
            :cell-style="{textAlign:'center'}"
            size="mini"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="头像" width="80">
              <template slot-scope="scope">

                <img :src="scope.row.headimgurl" alt="" class='avatar'>
                </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
            <el-table-column prop="city" label="省(直辖市)" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="subscribe_time" label="关注时间" width="130">
              <template slot-scope='scope'>
                {{scope.row.subscribe_time|formatTime}}
              </template>
            </el-table-column>
            <el-table-column prop="openid" label="绑定用户" width="140"></el-table-column>
            <el-table-column prop="name" label="操作" width="80">
              <i :style="{fontSize:'30px',color:'#00B7C5',cursor:'pointer'}" class="el-icon-s-comment"></i>
            </el-table-column>
          </el-table>
        </div>
        <div class="user-update">
          <div class="update">
            <el-button type="primary" size="mini">更新</el-button>
            <el-button type="primary" size="mini">添加</el-button>
          </div>
          <ul class="group">
            <li class="item">
              <span class="text" @click="getAllAttentionUser" >全部用户</span>
              <span class="numb">9</span>
            </li>
            <li class="item">
               <span class="text">未分组</span>
              <span class="numb">99</span>
            </li>

            <li class="item" v-for="(item) in labelList" :key="item.id" >
              <span class="text" @click="getLableGategoryUser({tagid:item.id})">{{item.name}}</span>
              <span class="numb">{{item.count}}</span>
              <el-button v-if="item.name!=='星标组'" class="group-btn" type="primary" size="mini">编辑</el-button>
            </li>

            <li class="item">
              <span class="text" @click="getBlackListUser">黑名单</span>
              <span class="numb">9999</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Pagination  @changeCurrentPage='changeCurrentPage'></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../Pagination";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      currentPage:0,
      theadClass: {
        backgroundColor: "#00B7C5",
        color: "white",
        textAlign: "center",
        height: "40px"
      },
      search: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
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
      labelList:state=>state.wxUserManage.labelList
    }),
    ...mapGetters(['showCurrentTableList']),
    // currentPage:{
    //   get
    // }
  },
  created() {
    this.getWeChatLabel();
    this.getAllAttentionUser();
    // this.getBlackListUser()
  },
  mounted() {
    

  },

  methods: {
    ...mapActions(["getWeChatLabel", "getAllAttentionUser",'getLableGategoryUser','getBlackListUser']),
    changeCurrentPage(page){
      this.currentPage = page
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
     this.multipleSelection = val;
    }
  },
  filters:{
    formatTime(time){
      return new Date(time*1000).toLocaleDateString()
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
        .table-td{
          text-align: center;
        }
        .avatar {
          width: .3rem;
          height: .3rem;
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
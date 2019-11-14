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
            :data="tableData"
            tooltip-effect="dark"
             :border="true"
             height="400"
            :header-cell-style="theadClass"
            size='mini'
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="头像" width="80">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="昵称" width="120"></el-table-column>
            <el-table-column prop="address" label="省(直辖市)" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="关注时间" width="130"></el-table-column>
            <el-table-column prop="name" label="绑定用户" width="140"></el-table-column>
            <el-table-column prop="name" label="操作" width="80"></el-table-column>

          </el-table>
        </div>
        <div class="user-update">
          <div class="update">
            <el-button type="primary" size="mini">更新</el-button>
            <el-button type="primary" size="mini">添加</el-button>
          </div>
          <ul class="group">
            <li class="item"><span class="text">全部用户</span><span class="numb">9</span></li>
            <li class="item">未分组<span class="numb">99</span></li>
            <li class="item">未分组<span class="numb">99</span> <el-button class="group-btn" type="primary" size="mini">编辑</el-button></li>
            <li class="item"><span class="text"> 未分组手动阀是阿斯顿发分</span><span class="numb">9999</span> <el-button class="group-btn" type="primary" size="mini">编辑</el-button></li>
            <li class="item"><span class="text">黑名单</span><span class="numb">9999</span></li>
          
          </ul>
        </div>
      </div>
      <div>
        <Pagination ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../Pagination'
import { mapActions } from 'vuex';
export default {
  data() {
    return {
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
      tableData: [{
          date: '2016-',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []

    };
  },

  computed: {},
  created(){
    this.getWeChatLabel()
    this.getAllAttentionUser()
  },
  mounted() {},

  methods: {
    ...mapActions(['getWeChatLabel','getAllAttentionUser']),
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

  components: {Pagination}
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
      margin-top: .2rem;
      margin-bottom: .1rem;
      display: flex;
      justify-content: space-between;
      .user-search {
        display: flex;
      }
    }
    .user-show {
     display: flex;
      .user-update{
        margin-left: .1rem;
        flex: 1;
        align-self: flex-start;
        box-sizing: border-box;
        
        border: 1px solid rgb(235, 238, 245);
        .update {
          display:flex;
          border: 1px solid rgb(235, 238, 245);
          line-height: .4rem;
          padding: .06rem;

        }
        .group {
          font-size: .14rem;
          .item {
           border: 1px solid rgb(235, 238, 245);
           line-height: .35rem;
           padding-left: .05rem;
            .text{
              width: .6rem;
              display: block;
              float: left;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              
            }
           .numb {
             background-color: red;
             border-radius: .1rem;
             display: inline-block;
             line-height: 1;
             text-align: center;
             min-width: .2rem;
             margin-left: .02rem;
             color: white;
             
            
           }
           .group-btn {
             margin-top: .07rem;
             float: right;
             margin-right: .01rem;
             width: .4rem;
             height: .2rem;
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
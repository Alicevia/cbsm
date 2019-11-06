<template>
  <div class="all-service">
    <h2>全部服务</h2>
    <TableDisplay :trData="allCurrentAudit" :currentPage="currentPage" :thData="thData">
      <template slot-scope="slot">
        <tr v-for="(item) in slot.data[currentPage]" :key="item.id">
          <td>{{item.name}}</td>
          <td>
            <el-date-picker
              format="yyyy-MM-dd"
              type="date"
              class="picker"
              :value="item.expirationDate?item.expirationDate:null"
              @input="setTime($event,item.id)"
              placeholder="选择日期"
            ></el-date-picker>
          </td>
          <td>
            <el-button v-if="item.status===4" size="mini" type="success" @click="adminSet(item,'START')">启动</el-button>
            <el-button v-else-if="item.status===3" size="mini" type="danger" @click="adminSet(item,'STOP')">停止</el-button>
            <el-button v-else-if="item.status===1" size="mini" type="success" @click="adminSet(item,'START')">启动</el-button>
            <el-button v-else-if="item.status===0" size="mini" type="success"  @click="adminSet(item,'START')">启动</el-button>
            <el-button v-else-if="item.status===2" size="mini" type="info" :disabled="true">请在待审核内处理</el-button>
          </td>
        </tr>
        <tr v-for="(item,index) of resetTr" :key="index">
          <td>{{'-'}}</td>
          <td></td>
          <td></td>
        </tr>
      </template>
    </TableDisplay>
    <NextBtn @changePage="changePage"></NextBtn>
  </div>
</template>

<script>
import TableDisplay from "src/common/TableDisplay";
import NextBtn from "src/common/NextBtn";
import { mapState, mapActions, mapGetters } from "vuex";
import { Message } from "element-ui";
import moment from "moment";
import {reqAuditPass,reqManageServiceWork} from 'src/api'
export default {
  data() {
    return {
      currentPage: 0,
      thData: [
        { category: "设备类型", th: { width: "3.6rem" } },
        { category: "过期时间", th: { width: "auto" } },
        { category: "操作", th: { width: "2rem" } }
      ]
    };
  },

  computed: {
    ...mapState(["activeIntentionUser"]),
    ...mapGetters(["allCurrentAudit"]),

    // 获取到最大页数
    maxPages: {
      get() {
        return this.allCurrentAudit.length;
      }
    },
    // 计算没有填充的行数
    resetTr() {
      let { allCurrentAudit, currentPage } = this;
      if (!allCurrentAudit[currentPage]) {
        allCurrentAudit[currentPage] = [];
      }
      let reset = 3 - allCurrentAudit[currentPage].length;
      return reset;
    }
  },

  mounted() {},

  methods: {
    ...mapActions(["updateAllServiceDevice"]),
    changePage(type) {
      let { currentPage, maxPages } = this;
      if (type === "add") {
        if (currentPage + 1 >= maxPages) {
          Message.warning("已经是最后一页");
          return;
        }
        this.currentPage++;
      } else {
        if (currentPage <= 0) {
          Message.warning("已经第一页了");
          return;
        }
        this.currentPage--;
      }
    },
    setTime(e, auditId) {
      let { id } = this.activeIntentionUser;
      let time = new Date(e);
      time = moment(time).format("YYYY-MM-DD");
      this.updateAllServiceDevice({
        id,
        auditId,
        time
      });
      // this.updateUserAuditInfo({
      //   id,
      //   currentPage,
      //   auditId,
      //   time
      // });

      console.log(time);

      // console.log(e.target.value)
    },
    // 更新全部服务的信息
    modiUserAuditStatus(auditId, status) {
      let { id } = this.activeIntentionUser;
      this.updateAllServiceDevice({
        id,
        status,
        auditId
      });
    },
    async adminSet(item,type){
      let {id:userId} = this.activeIntentionUser
      let {id:manageId,expirationDate} = item
      if (!expirationDate) {
        Message.warning('请设置时间')
        return
      }
      let result = await reqManageServiceWork({
        userId,
        manageId,
        expirationDate,
        examineType:type
      })
      if (result.succeed) {
        if (type==='START') {
          this.modiUserAuditStatus(manageId,3)
        }
        if (type==='STOP') {
          this.modiUserAuditStatus(manageId,4)
        }
        Message.success('服务设置成功')
      }else{
        Message.error('服务设置失败')

      }



    }
  },

  components: { TableDisplay, NextBtn }
};
</script>
<style lang='less' scoped>
.all-service {
  h2 {
    color: #373d41;
    font-size: 0.18rem;
    text-decoration: underline;
    margin-bottom: 0.1rem;
  }
}
</style>
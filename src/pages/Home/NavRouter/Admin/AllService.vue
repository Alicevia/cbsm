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
            <template v-if="item.status===2">
              <el-button class="btn" size="mini" round type="success" @click="agree(item)">同意</el-button>
              <el-button class="btn" size="mini" round type="danger" @click="reject(item)">拒绝</el-button>
            </template>
            <el-button v-else-if="item.status===3" size="mini" type="success">已开通,点击关闭</el-button>
            <el-button v-else-if="item.status===1" size="mini" type="warning">已拒绝开通请求，点击开通</el-button>
            <el-button v-else-if="item.status===0" size="mini" type="success">启动</el-button>
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
import {reqAuditPass} from 'src/api'
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
    ModiUserAuditStatus(auditId, status) {
      let { id } = this.activeIntentionUser;
      this.updateAllServiceDevice({
        id,
        status,
        auditId
      });
    },
    async agree(item) {
      console.log(item)
      let { customerId, id, modelId, expirationDate } = item;
      if (!expirationDate) {
        Message.warning("请先设置过期时间");
        return;
      }
      let result = await reqAuditPass({
        customerId,
        id,
        modelId,
        expirationDate,
        examineType: "AGREE"
      });
      if (result.succeed) {
        this.ModiUserAuditStatus(id, 3);
        Message.success("为用户开通成功");
      } else {
        Message.error("为用户开通失败");
      }
    },
    async reject(item) {
      let { id } = item;
      let result = await reqAuditPass({
        // customerId,
        id,
        // modelId,
        // expirationDate,
        examineType: "REFUSE"
      });
      if (result.succeed) {
        this.ModiUserAuditStatus(id, 1);
        Message.success("已拒绝用户请求");
      } else {
        Message.error("拒绝用户请求操作失败");
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
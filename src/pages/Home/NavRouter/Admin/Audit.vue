<template>
  <div class="audit">
    <h2>待审核</h2>
    <TableDisplay :trData="currentAudit" :currentPage="currentPage" :thData="thData">
      <template slot-scope="slot">
        <tr v-for="(item) in slot.data[currentPage]" :key="item.id">
          <td>{{item.name}}</td>
          <td>
            <el-date-picker
              format="yyyy-MM-dd"
              type="date"
              class="picker"
              :value="item.expirationDate?item.expirationDate:'1989-02-06'"
              @input="setTime($event,item.id)"
              placeholder="选择日期"
            ></el-date-picker>
          </td>
          <td>
            <el-button class="btn" size="mini" round type="success" @click="agree(item)">同意</el-button>
            <el-button class="btn" size="mini" round type="danger" @click="reject">拒绝</el-button>
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
import { mapState, mapActions } from "vuex";
import { reqAuditPass } from "src/api";
import utils from "src/utils";
import { Message } from "element-ui";
import moment  from 'moment'
export default {
  data() {
    return {
      currentPage: 0,
      thData: [
        { category: "设备类型", th: { width: "4rem" } },
        { category: "过期时间", th: { width: "2rem" } },
        { category: "操作", th: { width: "2rem" } }
      ]
    };
  },

  computed: {
    ...mapState(["currentAudit", "activeIntentionUser"]),
    // 获取到最大页数
    maxPages: {
      get() {
        return this.currentAudit.length;
      }
    },
    // 计算没有填充的行数
    resetTr() {
      let { currentAudit, currentPage } = this;
      if (!currentAudit[currentPage]) {
        currentAudit[currentPage] = [];
      }
      let reset = 3 - currentAudit[currentPage].length;
      return reset;
    }
  },

  mounted() {},

  methods: {
    ...mapActions(['updateUserAuditInfo']),
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
      let { currentPage } = this;
      
      let time = new Date(e);
      time= moment(time).format('YYYY-MM-DD')

      this.updateUserAuditInfo({
        id,currentPage,auditId,time
      })
      console.log(time);

      // console.log(e.target.value)
    },
    async agree(item) {
      let { customerId, id, modelId, expirationDate } = item;

      let result = await reqAuditPass({
        customerId,
        id,
        modelId,
        expirationDate,
        examineType: "AGREE"
      });
      console.log(item);
    },
    reject() {}
  },
  components: { TableDisplay, NextBtn }
};
</script>
<style lang='less' scoped>
.audit {
  h2 {
    color: #373d41;
    font-size: 0.18rem;
    text-decoration: underline;
    margin-bottom: 0.1rem;
  }

}
</style>
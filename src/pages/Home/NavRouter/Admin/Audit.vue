<template>
  <div class="audit">
    <h2>意向用户</h2>
    <TableDisplay :trData="trData">
      <template slot-scope="slot">
        <!-- rowspan -->
        <tr v-for="(item,index) in slot.data" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>
            <input type="text" class="remark" :placeholder="item.bz" />
          </td>
        </tr>
      </template>
    </TableDisplay>
    <NextBtn></NextBtn>
  </div>
</template>

<script>
import TableDisplay from "src/common/TableDisplay"
import NextBtn from "src/common/NextBtn";
export default {
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {},

  components: {
    TableDisplay,NextBtn
  }
};
</script>
<style lang='less' scoped>
</style>
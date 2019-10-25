<template>
  <div class="service-wrap">
    <div class="service-description">
      <div class="category">设备种类</div>
      <div class="time">过期时间</div>
      <div class="operate">操作</div>

    </div>

    <ul class="service-show">
      <li class="service-item">
        <div class="item-icon">
          <img src="~src/assets/images/temp.png" alt="">
        </div>
        <div class="item-title">
          <h2>温度传感器</h2>
          <p>温度的测量及控制对保证产品质量、提高生产效、率节约能源、生产安全...</p>
        </div>
        <div class="item-state">
          <!-- <span class="past">已过期</span> -->
          <span>2019.11.12</span>
        </div>
        <div class="item-operation">
          <el-button type="primary" size="small">开通</el-button>
        </div>
      </li>
       <li class="service-item">
        <div class="item-icon">
          <img src="~src/assets/images/temp.png" alt="">
        </div>
        <div class="item-title">
          <h2>温度传感器</h2>
          <p>温度的测量及控制对保证产品质量、提高生产效、率节约能源、生产安全...</p>
        </div>
        <div class="item-state">
          <span class="past">已过期</span>
          <!-- <span >（2019.11.12）</span> -->
        </div>
        <div class="item-operation">
          <el-button type="warning" size="small">待审核</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
    };
  },

  computed: {},

  mounted(){},

  methods: {},

  components: {},
}

</script>
<style lang='less' scoped>
.service-wrap {
  .service-description{
    display: flex;
    font-size: .16rem;
    font-weight: bold;
    text-align: center;
    height: .5rem;
    line-height: .5rem;
    color:white;
    background-color:#00B7C5;
    .category {
      width: 5rem;
      border-right:1px solid white;
    }
    .time {
      width: 1.6rem;
      text-align: center;
      border-right:1px solid white;

    }
    .operate {
      width:1.2rem;
      text-align: center;
    }
  }
  .service-show {
    .service-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 0 .4rem;
      height: .6rem;
      background-color: #DDF8FF;
      border-top: 1px solid white;
      box-sizing: border-box;
      // &:first-child{
      //   border: none;
      // }
      &:hover {
        background-color: #E4EEF1;
      }
      .item-icon {
        width: .4rem;
        height: .4rem;
        border-radius: .04rem;
        background-color: #fff;
        img {
          display: block;
          margin-left: .02rem;
          margin-top: .02rem;
          width: .36rem;
          height: .36rem;
        }

      }
      .item-title {
        width: 3.95rem;
        padding-left: .15rem;
        h2 {
          color: #373D41;
          font-size: .14rem;
          font-weight: bold;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #7C7C7C;
          font-size: .12rem;
        }
      }
      .item-state{
        width: 1.92rem;
        min-width: 1.3rem;
        box-sizing: border-box;
        text-align: center;
        padding-right: .15rem;
        .past {
          color: red;
        }

        // flex: 2;
        

      }
      .item-operation{
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
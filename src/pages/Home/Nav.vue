<template>
  <div class="nav">
      <ul class="nav-wrap">
          <router-link to='/home/wx' tag="li" class="nav-item wx">
              <a><span class="iconfont">&#xe7e5;</span> 微信管理</a>
          </router-link>
          <router-link to='/home/message' tag="li" class="nav-item message">
              <a><span class="iconfont">&#xe7aa;</span> 短信服务</a>
          </router-link>
          <router-link to="/home/account" tag="li" class="nav-item account">
              <a><span class="iconfont">&#xe65b;</span> 账户信息</a>
          </router-link>                  
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
    .nav {
        margin-top: .46rem;
        text-align: center;

        .nav-wrap {
            .nav-item {
                line-height: .5rem;
                a {
                    font-size: .16rem;
                    color: #373D41;
                     span {
                        margin-right: .14rem;
                    }
                }    
                &.active {
                    background-color: #00B7C5;
                    a {
                        color: white;
                    }
                }    
               
            }
        }
    }

</style>
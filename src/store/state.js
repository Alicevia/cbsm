export default {
  userToken: '',
  userInfo: {},
  weChatInfo: {},
  aliId: '',
  aliMessageInfo: {},

  groupInformation: [],
  showCurrent:[],//当前服务管理渲染的所有数据
  activeServiceInfo:{//当前选中的请求配置
    id:0,
    index:0,
    page:0,
    size:9
  },

  currentAudit:{}, //当前渲染的待审核
  activeIntentionUser:{},//选中的意向用户
  applyServiceUserList:{},//意向用户列表
  auditService:{},//意向用户的服务待处理
  allServiceDevice:{},//所有服务
  


  
}
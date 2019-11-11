export default {
  userToken: '',
  userInfo: {},
  weChatInfo: {},
  weChatMenus:[],
  // weChatOriginMenus:[],
  weChatAccessToken:'',
  aliId: '',
  aliMessageInfo: {},

  groupInformation: [],
  showCurrent:[],//当前服务管理渲染的所有数据
  activeServiceInfo:{//当前选中某个用户的请求配置
    id:0,
    index:0,
    page:0,//当前用户在的页数
    size:9//每页多少个
  },


  applyServiceUserList:[],//意向用户列表
  activeIntentionUser:{},//选中的意向用户

  currentAudit:[], //当前渲染的待审核
  
  allAuditService:{},//所有的待审核

  allServiceDevice:{},//所有服务
  
}
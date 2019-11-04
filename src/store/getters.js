import utils from "src/utils"

export default {
    // pages(state,getters){
    //     let {iconList} = state
    //     let pages = []
    //     iconList.forEach((item,index)=>{
 
    //          let page = Math.floor(index/8)
    //          if (!pages[page]) {
    //              pages[page] =[]
    //          }
    //          pages[page].push(item)
    //     })
    //     return pages
    //  },
    bindPhone(state){
        let {userInfo} = state
        return userInfo.phone?false:true
    },
    aliMessage(state){
        let aliId = state.aliId
        return aliId?false:true
    },
    //根据获取到的设备分组类别生成对象
    // groupItemInfos(state){
    //   let groupItemInfo = state.groupInformation
    //   return groupItemInfo.map((item,index)=>{
    //     return {[item.groupName]:[]}
    //   })

    // }
    //验证是否需要发送请求获取数据
    checkLocalServiceData(state){
      let {activeServiceInfo,groupInformation} = state
      let {id,page,index} = activeServiceInfo
      let othersPage = groupInformation.filter(item=>{
        if (!item.allPage) {
          item.allPage={}
        }
        return item.id===id && item.allPage[page]
      })
      let firstPage = groupInformation[index].allPage[0]

      return {othersPage,firstPage}
    },
    // 获取当前展示的服务种类最大数目
    getMaxService(state){
      let {activeServiceInfo,groupInformation} = state
      let maxPage
      groupInformation.forEach(item=>{
        if (item.id===activeServiceInfo.id) {
          maxPage = item.total
          
        }
      })


      return maxPage
    },
    // 对要展示的全部服务进行数组的二维化
    allCurrentAudit(state){
      let ary
      let {activeIntentionUser,allServiceDevice} = state
      let {id} = activeIntentionUser

      ary = utils.changeAry(allServiceDevice[id],3)
      return ary
    }
    
}
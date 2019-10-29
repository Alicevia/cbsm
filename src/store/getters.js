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
      let {id,page} = activeServiceInfo
      let flag = groupInformation.filter(item=>{
        return item.id===id && item.allPage[page]
      })
      return flag
    
     
      
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
    }
    
}
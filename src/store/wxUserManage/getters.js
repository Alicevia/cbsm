import utils from 'src/utils'
export default {
  showCurrentTableList(state){
    let {currentTableList} = state
    return utils.changeAry(currentTableList,10)
  }
  

}
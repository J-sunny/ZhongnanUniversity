import {parseTime} from '@/utils/index'
export function ERR(name,val) {//输出错误日志
  console.log(process.env.COL_LOG)

  if(process.env.COL_LOG!=0){
    return
  }
  console.error( parseTime((new Date()).valueOf(),"{y}-{m}-{d} {h}:{i}:{s}:{l}--来自模块")+name+"--"+val)
}
export function INFO(name,val) {//输出提示信息
  if(process.env.COL_LOG!=0){
    return
  }
  console.info(parseTime((new Date()).valueOf(),"{y}-{m}-{d} {h}:{i}:{s}:{l}--来自模块")+name+"--"+val)
}
export function LOG(name,val) {//输出操作日志
  if(process.env.COL_LOG!=0){
    return
  }
  console.log(parseTime((new Date()).valueOf(),"{y}-{m}-{d} {h}:{i}:{s}:{l}--来自模块")+name+"--"+val)
}
export function WARN(name,val) {//输出警告
  if(process.env.COL_LOG!=0){
    return
  }
  console.warn(parseTime((new Date()).valueOf(),"{y}-{m}-{d} {h}:{i}:{s}:{l}--来自模块")+name+"--"+val)
}
function locationHref() {
  var str=location.href; //取得整个地址栏
  var Href=str.split('?')[0]
  var Href=Href.split("#")[1]
  // return Href//返回主地址
  // return null
}

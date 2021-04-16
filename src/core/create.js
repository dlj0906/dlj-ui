/**
 * @Description: 初始化组件基础配置
 * @author LongJiang Dong
 * @date 2021/4/13
*/
import { KEY_COMPONENT_NAME } from 'global/variable'
export default function (sfc) {
  sfc.name = KEY_COMPONENT_NAME + (sfc.name || '') // 设置组件名称
  return sfc
}

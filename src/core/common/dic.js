/**
 * @Description: 字典操作
 * @author LongJiang Dong
 * @date 2021/4/13
 */

import {detailDic} from 'utils/util'
import {DIC_METHOD} from 'global/variable'
import axios from 'axios'

// 加载本地字典
export const loadLocalDic = (option) => {
  let locationDic = {}
  option.columns.forEach(ele => {
    if (ele.dicData) {
      locationDic[ele.prop] = ele.dicData
    }
  })
  return locationDic
}

// 加载网络字典
export const loadDic = (option) => {
  let ajaxDic = [] // 发送axios的字典
  return new Promise((resolve, reject) => {
    const params = createdDic(option)
    ajaxDic = params.ajaxDic
    handleDic(ajaxDic)
      .then((res) => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 初始化字典请求
function createdDic (option) {
  let columns = option.columns || []
  let ajaxDic = []
  columns.forEach(ele => {
    let url = ele.dicUrl // 请求地址
    let prop = ele.prop // 监听字段
    let method = ele.method // 请求方式get/post
    let props = ele.props // 其他的键值字段配置
    if (url) {
      ajaxDic.push({
        url,
        name: prop,
        method,
        props
      })
    }
  })
  return {
    ajaxDic
  }
}

// 循环处理字典
function handleDic (list) {
  let networkDic = {}
  let result = []
  return new Promise(resolve => {
    list.forEach(ele => {
      result.push(
        new Promise(resolve => {
          sendDic(ele).then(res => {
            res = detailDic(res, ele.props)
            resolve(res)
          }).catch(() => {
            resolve([])
          })
        })
      )
    })
    Promise.all(result).then(data => {
      list.forEach((ele, index) => {
        // 塞入返回的字典数据
        networkDic[ele.name] = data[index]
      })
      resolve(networkDic)
    })
  })
}

// axios获取字典
export const sendDic = (params) => {
  let { url, method, query } = params
  url = url || ''
  method = method || DIC_METHOD
  let data = {}
  return new Promise(resolve => {
    const callback = (res) => {
      let list = []
      list = getObjValue(res.data)
      resolve(list)
    }
    if (method === 'post') {
      axios.post(url, ...data).then((res) => {
        callback(res)
      }).catch(() => [
        resolve([])
      ])
    } else {
      axios.get(url, {
        params: query
      }).then((res) => {
        callback(res)
      }).catch(() => [
        resolve([])
      ])
    }
  })
}
/**
 * 获取多层data
 */
export const getDeepData = (res) => {
  return (Array.isArray(res) ? res : res.data) || []
}
export const getObjValue = (data, params = '', type) => {
  const list = params.split('.')
  let result = data
  if (list[0] === '' && type !== 'object') {
    return getDeepData(data)
  } else if (list[0] !== '') {
    list.forEach(ele => {
      result = result[ele]
    })
  }
  return result
}

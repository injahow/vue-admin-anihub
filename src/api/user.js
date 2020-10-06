import request from '@/utils/request'
import store from '@/store'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}
export function join(data) {
  return request({
    url: '/api/user/join',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}
/**
 * 获取用户选项配置
 * @param {String} name
 */
export function getOptions(name) {
  const user_id = store.getters.id
  return request({
    url: `/api/user/${user_id}/options`,
    method: 'get',
    params: { name }
  })
}

/**
 * 提交用户修改的选项配置
 * @param {Object} name
 * @param {Object} options
 */
export function editOptions(name, options) {
  const user_id = store.getters.id
  return request({
    url: `/api/user/${user_id}/options`,
    method: 'put',
    data: { name, options }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

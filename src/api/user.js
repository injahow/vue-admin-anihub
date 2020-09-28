import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
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

export function getOptions(name) {
  return request({
    url: '/api/user/options',
    method: 'get',
    params: { name }
  })
}
export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

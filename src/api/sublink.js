import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/sublink',
    method: 'get'
  })
}

export function getIndex(form) {
  return request({
    url: '/api/sublink/index',
    method: 'post',
    data: form
  })
}

export function addOne(sublink) {
  return request({
    url: '/api/sublink',
    method: 'post',
    data: sublink
  })
}

export function getDetail(id) {
  return request({
    url: `/api/sublink/${id}`,
    method: 'get'
  })
}

export function editOne(sublink, changes) {
  return request({
    url: `/api/sublink/${sublink._id}`,
    method: 'put',
    data: { sublink, changes }
  })
}

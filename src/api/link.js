import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/link',
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

export function addOne(link) {
  return request({
    url: '/api/link',
    method: 'post',
    data: link
  })
}

export function getDetail(id) {
  return request({
    url: `/api/link/${id}`,
    method: 'get'
  })
}

export function editOne(link, changes) {
  return request({
    url: `/api/link/${link._id}`,
    method: 'put',
    data: { link, changes }
  })
}

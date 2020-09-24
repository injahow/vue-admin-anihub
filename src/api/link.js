import request from '@/utils/request'

export function getList() {
  return request({
    url: '/api/link',
    method: 'get'
  })
}

export function addOne(link) {
  return request({
    url: '/api/link',
    method: 'post',
    data: link
  })
}

export function addOneByUrl(url) {
  return request({
    url: '/api/link',
    method: 'get',
    params: { url }
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

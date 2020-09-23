import request from '@/utils/request'
import Url from 'url'

export function getList() {
  return request({
    url: '/api/anime',
    method: 'get'
  })
}

export function getIndex(form) {
  return request({
    url: '/api/anime/index',
    method: 'post',
    data: form
  })
}

export function addOne(anime) {
  return request({
    url: '/api/anime',
    method: 'post',
    data: anime
  })
}

export function addOneByUrl(url) {
  // host may be wrong !!!
  const host = Url.parse(url).host.split('.').reverse()[1]
  return request({
    url: `/${host}/anime`,
    method: 'get',
    params: { url }
  })
}

export function getDetail(id) {
  return request({
    url: `/api/anime/${id}`,
    method: 'get'
  })
}

export function editOne(anime, changes) {
  return request({
    url: `/api/anime/${anime._id}`,
    method: 'put',
    data: { anime, changes }
  })
}

export function deleteOne(id) {
  return request({
    url: `./api/anime/${id}`,
    method: 'delete'
  })
}

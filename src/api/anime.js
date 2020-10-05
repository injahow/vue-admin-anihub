import request from '@/utils/request'
import url from 'url'

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

export function search(name) {
  return request({
    url: `/api/anime/search?name=${name}`,
    method: 'get'
  })
}

export function addOne(anime) {
  return request({
    url: '/api/anime',
    method: 'post',
    data: anime
  })
}

export function addOneByUrl(_url) {
  // _url may be wrong
  const hostname = url.parse(_url).hostname
  if (!hostname) {
    return Promise.reject({ error: 'Url Error' })
  }
  // ! site_name may be wrong
  const site_name = hostname.split('.').reverse()[1]
  return request({
    url: `/${site_name}/anime`,
    method: 'get',
    params: { url: _url }
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

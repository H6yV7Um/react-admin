import axios from 'axios'
import qs from 'qs'
import {getStore} from './../store'

axios.defaults.baseURL = 'http://120.79.224.26:3000';
axios.defaults.headers.authRoles = getStore('userInfo') ? getStore('userInfo').roles : "" 
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data), {

    }
    ).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
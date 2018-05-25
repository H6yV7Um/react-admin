import {post} from './axios'

export const fetchUserMsg = (data,callback="")=>{
    post('/user/login',data)
    .then(result => {
        callback && callback(result)
    })
}
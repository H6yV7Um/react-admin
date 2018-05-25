import cookie from 'js-cookie'

const defaultName = "admin-key"

export function setCookie(name=defaultName,key) {
    return cookie.set(name,key)
}

export function getCookie(name){
    return cookie.get(name)
}

export function removeCookie(name){
    return cookie.remove(name)
}
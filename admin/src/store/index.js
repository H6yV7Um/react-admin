import store from 'store'

export const setStore = (key,value) => {
    store.set(key,value)
}

export const getStore = key => {
    return store.get(key)
}

export const removeStore = key => {
    store.remove(key)
}

export const removeAllStore = ()=> {
    store.clearAll()
}
import api from '@/apis/api'
import router from '@/router'

export const getOrders = async ({commit}) => {
    try {
        const res = await api.get('orders')
        if (res.status === 200) {
            commit('GET_ORDERS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const storeOrder = async ({commit, dispatch}, {user_id, items, total}) => {
    try {
        const res = await api.post('orders', {
            user_id: user_id,
            items: items,
            total: total,
        })
        if (res.status === 201) {
            commit('SET_SUCCESS_STATUS', true)
            dispatch('cart/removeAllFromCart', [], { root: true })
            router.push({ name: 'Orders' })
        }
    } catch (error) {
        console.log(error)
    }
}

export const setSuccessStatus = async ({commit}, value) => {
    commit('SET_SUCCESS_STATUS', value)
}


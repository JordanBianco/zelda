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

export const storeOrder = async ({commit, dispatch}, {customer, items, total}) => {
    try {
        const res = await api.post('orders', {
            customer: customer,
            items: items,
            total: total,
        })
        if (res.status === 201) {
            commit('SET_SUCCESS_STATUS', true)
            dispatch('cart/removeAllFromCart', [], { root: true })
            router.push({ name: 'Orders' })
        }
    } catch (error) {
        commit('SET_SUCCESS_STATUS', true)
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const setSuccessStatus = ({commit}, value) => {
    commit('SET_SUCCESS_STATUS', value)
}

export const clearErrors = ({commit}) => {
    commit('SET_ERRORS', [])
}


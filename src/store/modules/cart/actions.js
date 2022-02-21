import api from '@/apis/api'

export const getCartItems = async ({commit}) => {
    try {
        const res = await api.get('cart')
        if (res.status === 200) {
            commit('GET_CART_ITEMS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const addToCart = async ({commit}, {item}) => {
    try {
        const res = await api.post('cart', {
            id: item.book.id,
            quantity: item.quantity
        })
        if (res.status === 200) {
            commit('ADD_TO_CART', item)
            commit('notifications/ADD_NOTIFICATION', { message: 'Libro aggiunto al carrello' }, { root:true})

        }
    } catch (error) {
        console.log(error)
    }
}

export const removeFromCart = async ({commit}, {book, index}) => {
    try {
        const res = await api.delete('cart', { params: { id: book.id } })
        if (res.status === 200) {
            commit('REMOVE_FROM_CART', index)
            commit('notifications/ADD_NOTIFICATION', { message: 'Libro rimosso dal carrello' }, { root:true})
        }
    } catch (error) {
        console.log(error)
    }
}

export const decreaseQuantity = async ({commit}, {book}) => {
    try {
        const res = await api.patch('cart/' + book.id  + '/decrease')
        if (res.status === 200) {
            commit('DECREASE_QUANTITY', book)
        }
    } catch (error) {
        console.log(error)
    }
}

export const increaseQuantity = async ({commit}, {item}) => {
    try {
        const res = await api.patch('cart/' + item.book.id + '/increase')
        if (res.status === 200) {
            commit('INCREASE_QUANTITY', item)
        }
    } catch (error) {
        console.log(error)
    }
}

export const adjustQuantity = async ({commit}, {item}) => {
    try {
        const res = await api.patch('cart/' + item.book.id + '/adjust')
        if (res.status === 200) {
            commit('ADJUST_QUANTITY', item)
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeAllFromCart = async ({commit}) => {
    try {
        const res = await api.delete('remove-all')
        if (res.status === 200) {
            commit('GET_CART_ITEMS', [])
        }
    } catch (error) {
        console.log(error)
    }
}

export const emptyCart = async ({commit}) => {
    commit('GET_CART_ITEMS', [])
}

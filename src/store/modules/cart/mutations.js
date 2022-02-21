export const GET_CART_ITEMS = (state, items) => {
    state.items = items
}

export const ADD_TO_CART = (state, item) => {
    let itemInCart = state.items.find(i => {
        return i.book.id === item.book.id
    })

    if (! itemInCart) {
        state.items.push(item)
    } else {
        itemInCart.quantity = itemInCart.quantity + item.quantity
    }
}

export const DECREASE_QUANTITY = (state, book) => {
    let itemInCart = state.items.find(i => {
        return i.book.id === book.id
    })

    itemInCart.quantity = itemInCart.quantity - 1
}

export const INCREASE_QUANTITY = (state, item) => {
    let itemInCart = state.items.find(i => {
        return i.book.id === item.book.id
    })

    itemInCart.quantity = itemInCart.quantity + 1
}

export const ADJUST_QUANTITY = (state, item) => {
    let itemInCart = state.items.find(i => {
        return i.book.id === item.book.id
    })

    itemInCart.quantity = itemInCart.book.quantity_in_stock
}

export const REMOVE_FROM_CART = (state, index) => {
    state.items.splice(index, 1)
}
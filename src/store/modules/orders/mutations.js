export const GET_ORDERS = (state, orders) => {
    state.orders = orders
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors
}
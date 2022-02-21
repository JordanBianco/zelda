export const GET_REVIEWS = (state, reviews) => {
    state.reviews = reviews
}

export const ADD_REVIEWED = (state, id) => {
    state.reviewed.push(id)
}

export const DELETE_REVIEW = (state, index) => {
    state.reviews.splice(index, 1)
}

export const TOGGLE_SHOW = (state, value) => {
    state.show = value
}

export const SET_SUCCESS_STATUS = (state, value) => {
    state.success = value
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors
}
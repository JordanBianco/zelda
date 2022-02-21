export const GET_BOOKS = (state, books) => {
    state.books = books
}

export const GET_BOOK = (state, book) => {
    state.book = book
}

export const GET_SIMILAR_BOOKS = (state, books) => {
    state.similarBooks = books
}

export const GET_REVIEWS = (state, reviews) => {
    state.reviews = reviews
}

export const GET_SELECTED_REVIEWS = (state, reviews) => {
    state.selectedReviews = reviews
}

export const SET_ERRORS = (state, errors) => {
    state.errors = errors
}

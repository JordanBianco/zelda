export const reviews = (state) => {
    return state.reviews
}

export const reviewed = (state) => {
    let reviewed = state.reviewed
    
    state.reviews.forEach(review => {
        reviewed.push(review.book_id)
    })

    return reviewed
}

export const show = (state) => {
    return state.show
}

export const success = (state) => {
    return state.success
}

export const errors = (state) => {
    return state.errors
}
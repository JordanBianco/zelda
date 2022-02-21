export const GET_FAVOURITES = (state, favourites) => {
    state.favourites = favourites
}

export const ADD_TO_FAVOURITE = (state, book) => {
    state.favourites.push(book)
}

export const REMOVE_FROM_FAVOURITE = (state, book) => {
    let bookInFavourites = state.favourites.find(b => {
        return b.id === book.id
    })

    if (bookInFavourites) {
        state.favourites.splice(state.favourites.indexOf(bookInFavourites), 1)
    } else {
        console.log('error')
    }
}
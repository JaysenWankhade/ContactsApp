export const addToFav = (contact) => {
    return {
        type: "fav/add",
        payload: contact
    }
}

export const removeFromFav = (id) => {
    return {
        type: "fav/remove",
        payload: id
    }
}
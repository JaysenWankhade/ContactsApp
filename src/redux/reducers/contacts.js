const initialState = {
    favorites: [

    ]
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "fav/add":
            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    action.payload
                ]
            }
        case "fav/remove":
            return {
                ...state,
                favorites: state.favorites.filter(contact => contact.id !== action.payload)
            }
        default:
            return state
    }
}
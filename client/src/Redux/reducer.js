import { GET_REVIEWS, GET_MENU, SET_GRID, SET_LIST } from "./actions";

let initialstate = {
    storeView: "list",
    menu: [],
    reviews: []
};

let reducer = (state = initialstate, action) => {
    switch (action.type) {
        case SET_GRID:
            return {
                ...state,
                storeView: action.payload
            }

        case SET_LIST:
            return {
                ...state,
                storeView: action.payload
            }

        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            }

        case GET_MENU:
            return {
                ...state,
                menu: action.payload
            }

        default:
            return { ...state }

    }
}

export default reducer;
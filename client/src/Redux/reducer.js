import { GET_REVIEWS, GET_MENU } from "./actions";

let initialstate = {
    menu: [],
    reviews: []
};

let reducer = (state = initialstate, action) => {
    switch (action.type) {

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
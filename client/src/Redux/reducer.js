import { GET_REVIEWS, GET_MENU, SET_GRID, SET_LIST, SET_TYPE } from "./actions";

let initialstate = {
    storeView: "",
    foodType: "Todos",
    menu: [],
    menuAux: [],
    reviews: [],
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


            case SET_TYPE:
                const aux = [...state.menuAux];
                const foodTypes = action.payload === "Todos" ? aux : aux.filter((food) =>
                    food.type?.includes(action.payload)
                );
                return {
                    ...state,
                    menu: foodTypes,
                    foodType: action.payload
                };

        case GET_MENU:
            return {
                ...state,
                menu: action.payload,
                menuAux: action.payload

            }

        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            }


        default:
            return { ...state }

    }
}

export default reducer;
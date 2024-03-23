import { GET_REVIEWS, GET_MENU, SET_GRID, SET_LIST, SET_TYPE, ADD_TO_CART, DELETE_TO_CART, SEARCH_FOOD } from "./actions";

let initialstate = {
    storeView: "",
    foodType: "Todos",
    menu: [],
    menuAux: [],
    reviews: [],
    cart: { foodInCart: [], foodInCartAux: [], amount: 0, quantity: 0 },

};

let reducer = (state = initialstate, action) => {
    switch (action.type) {
        case GET_MENU:
            return {
                ...state,
                menu: action.payload,
                menuAux: action.payload

            }

        case SEARCH_FOOD:
            const aux2 = [...state.menuAux];
            const foodSearched = action.payload.trim() === "" ? aux2 : aux2.filter((food) =>
                food.title.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                menu: foodSearched
            };


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

        case ADD_TO_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    foodInCart: [...state.cart.foodInCart, action.payload],
                    foodInCartAux: [...state.cart.foodInCart, action.payload]
                }
            }
        case DELETE_TO_CART:
            const updatedFoodInCart = state.cart.foodInCart.filter(food => food.id !== action.payload.id);
            return {
                ...state,
                cart: {
                    foodInCart: updatedFoodInCart
                }
            };
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
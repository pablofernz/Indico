import { SET_NETWORK_ERROR, GET_REVIEWS, GET_MENU, SET_GRID, SET_LIST, SET_TYPE, ADD_TO_CART, DELETE_TO_CART, SEARCH_FOOD, UPDATE_ITEM_QUANTITY, SEND_ORDER, CLEAR_CART, KEEP_CART, CART_STATUS, GET_USERS, SET_SLOWNETWORK_POPUP, SET_COOKIES_POPUP } from "./actions";

let cartItemsFromStorage = window.sessionStorage.getItem("cartItems") ? JSON.parse(window.sessionStorage.getItem("cartItems")) : [];
let initialstate = {
    users: "",
    storeView: "list",
    cartIsOpen: false,
    foodType: "Todos",
    isSearching: false,
    menu: [],
    menuAux: [],
    reviews: [],
    cart: { foodInCart: window.sessionStorage.getItem("purchase_completed") == "true" || !window.sessionStorage.getItem("purchase_completed") ? [] : cartItemsFromStorage, foodInCartAux: [], amount: 0, quantity: 0 },
    orderSent: null,
    errors: { network_connection: false },
    popups: { cookies: false, slowNetwork: false }
};

if (JSON.parse(window.sessionStorage.getItem("cartItems"))) {
    let initialstate = {
        cart: {
            foodInCart: JSON.parse(window.sessionStorage.getItem("cartItems"))
        }
    }
}

let reducer = (state = initialstate, action) => {
    switch (action.type) {

        case SET_COOKIES_POPUP:
            return {
                ...state,
                popups: { ...state, cookies: action.payload },
            }
        case SET_SLOWNETWORK_POPUP:
            return {
                ...state,
                popups: { ...state, slowNetwork: action.payload },
            }
        case SET_NETWORK_ERROR:
            return {
                ...state,
                errors: { ...state, network_connection: true },
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }

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
                menu: foodSearched,
                isSearching: action.payload ? true : false
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

        case CART_STATUS:
            return {
                ...state,
                cartIsOpen: action.payload
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

        case UPDATE_ITEM_QUANTITY:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    foodInCart: state.cart.foodInCart.map(item => {
                        if (item.id === action.payload.itemId) {
                            return { ...item, quantity: action.payload.newQuantity };
                        }
                        return item;
                    })
                }
            };
        case DELETE_TO_CART:
            const updatedFoodInCart = state.cart.foodInCart.filter(food => food.id !== action.payload.id);
            return {
                ...state,
                cart: {
                    foodInCart: updatedFoodInCart
                }
            };
        case CLEAR_CART:
            return {
                ...state,
                cart: {
                    foodInCart: []
                }
            }

        case KEEP_CART:
            return {
                ...state,
                cart: {
                    foodInCart: action.payload
                }
            }
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            }

        case SEND_ORDER:
            return {
                ...state,
                orderCreated: action.payload
            }


        default:
            return { ...state }

    }
}

export default reducer;
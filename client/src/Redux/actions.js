import axios from "axios"
export const SET_GRID = 'SET_GRID'
export const SET_LIST = 'SET_LIST'
export const GET_REVIEWS = 'GET_REVIEWS'
export const GET_MENU = 'GET_MENU'
export const SET_TYPE = 'SET_TYPE'
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_TO_CART = 'DELETE_TO_CART'
export const SEARCH_FOOD = 'SEARCH_FOOD'
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
export const SEND_ORDER = 'SEND_ORDER'
export const CLEAR_CART = 'CLEAR_CART'
export const KEEP_CART = 'KEEP_CART'
export const CART_STATUS = 'CART_STATUS'
export const GET_USERS = 'GET_USERS'


export const getReviews = () => {
    return async function (dispatch) {
        const response = await axios.get('https://indico-backend.up.railway.app/store/reviews')
        const reviews = response.data
        // const data = reviews.map(rev => rev.reviews)
        // console.log(reviews)

        dispatch({
            type: GET_REVIEWS,
            payload: reviews
        })
    }
}

export const getMenu = () => {
    return async function (dispatch) {
        const response = await axios.get('https://indico-backend.up.railway.app/store/menu')
        const menu = response.data
        // console.log(menu)

        dispatch({
            type: GET_MENU,
            payload: menu
        })
    }
}

export const searchFood = (food) => {
    return async function (dispatch) {
        dispatch({
            type: SEARCH_FOOD,
            payload: food
        })
    }
}
export const setGrid = () => {
    return async function (dispatch) {
        dispatch({
            type: SET_GRID,
            payload: "grid"
        })
    }
}

export const setList = () => {
    return async function (dispatch) {
        dispatch({
            type: SET_LIST,
            payload: "list"
        })
    }
}

export const cartStatus = (status) => {
    return async function (dispatch) {
        dispatch({
            type: CART_STATUS,
            payload: status
        })
    }
}


export const setType = (type) => {
    return async function (dispatch) {
        dispatch({
            type: SET_TYPE,
            payload: type
        })
    }
}

export const addToCart = (food) => {
    return async function (dispatch) {
        dispatch({
            type: ADD_TO_CART,
            payload: food
        })
    }
}

export const keepCart = (cart) => {
    return async function (dispatch) {
        dispatch({
            type: KEEP_CART,
            payload: cart
        })
    }
}
export const updateItemQuantity = (itemId, newQuantity,) => {
    return {
        type: UPDATE_ITEM_QUANTITY,
        payload: {
            itemId,
            newQuantity
        }
    };
};
export const deleteToCart = (food) => {
    return async function (dispatch) {
        dispatch({
            type: DELETE_TO_CART,
            payload: food
        })
    }
}

export const clearCart = () => {
    return async function (dispatch) {
        dispatch({
            type: CLEAR_CART,
        })
    }
}

export const sendTheOrder = (order) => {
    return async function (dispatch) {
        dispatch({
            type: SEND_ORDER,
            payload: order
        })
    }
}

export const validateToken = async (token) => {
    try {
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Agrega el token JWT al encabezado de autorización
                    "Content-Type": "application/json", // Establece el tipo de contenido como JSON
                },
            };

            // Realiza la solicitud al servidor para validar el token
            const res = await axios.get("https://indico-backend.up.railway.app/token/test", config)

            // Retorna el resultado de la validación
            return res;
        } else {
            return "No hay token"
        }
    } catch (error) {
        return (error.response);
    }
}

export const getUserDataWithToken = async (token) => {
    try {
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Agrega el token JWT al encabezado de autorización
                    "Content-Type": "application/json", // Establece el tipo de contenido como JSON
                },
            };

            // Realiza la solicitud al servidor para validar el token
            const res = await axios.get("https://indico-backend.up.railway.app/token/getuserdata", config)

            // Retorna el resultado de la validación
            return res;
        } else {
            return "No hay token"
        }
    } catch (error) {
        return (error.response);
    }
}

export const getDataUsers = (waiting) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://indico-backend.up.railway.app/store/clients?waiting=${waiting}`);
            const users = response.data;

            dispatch({
                type: GET_USERS,
                payload: users,
            });
        } catch (error) {
            console.error(error);
        }
    };
};
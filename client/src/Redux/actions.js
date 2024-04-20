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

export const getReviews = () => {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/store/reviews')
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
        const response = await axios.get('http://localhost:3001/store/menu')
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


import axios from "axios"
export const SET_GRID = 'SET_GRID'
export const SET_LIST = 'SET_LIST'
export const GET_REVIEWS = 'GET_REVIEWS'
export const GET_MENU = 'GET_MENU'

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
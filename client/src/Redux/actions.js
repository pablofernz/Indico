import axios from "axios"

export const GET_REVIEWS = 'GET_REVIEWS'
export const GET_MENU = 'GET_MENU'

export const getReviews = () => {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/store/reviews')
        const reviews = response.data
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
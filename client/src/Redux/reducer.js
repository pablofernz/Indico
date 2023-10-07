import {PRUEBA} from './action-types'

let initialstate = {};

let reducer = (state = initialstate, action ) => {
switch (action.type) {
   
    case PRUEBA: 
    console.log('hola desde el state global')
    return{
    ...state
    }

    default:
    return {...state}

}
}

export default reducer;
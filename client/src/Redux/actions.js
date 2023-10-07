import { PRUEBA} from './action-types'

/*
/////////////////////ejemplo funcion asincrona para las store/////////////////////// 
export const asyncFunction = (params) => {
    return function(dispatch){
        fetch(`url`)
      .then((response) => response.json())
      .then((data) => dispatch({type: typeFunction, payload: data}))
    }
} 
*/

export const probarEstado = () => {
    console.log('hola desde actions')
    return{type:PRUEBA}
}
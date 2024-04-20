import { useEffect } from "react"
import { useSelector } from "react-redux"

const Pay = () =>{
    const arrayStringRecuperado = window.sessionStorage.getItem("order");
    const xd = JSON.parse(arrayStringRecuperado)
    useEffect(() => {
        console.log(sessionStorage.getItem("order") ? true : false);    })
    return(
        <p>{arrayStringRecuperado ? "Hay datos en el localStorage" : "No hay datos en el localStorage"}</p>
    )
}

export default Pay
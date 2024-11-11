import { NavLink } from "react-router-dom"

export default function Start() {
    return (
        <>
            <NavLink to={'superheroes/create'}><button>New Superhero</button></NavLink>
        </>
    )
}
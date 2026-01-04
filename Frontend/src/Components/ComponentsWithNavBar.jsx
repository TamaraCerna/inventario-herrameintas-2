import NavBar from "./NavBar"
import propTypes from "prop-types"


export default function ComponentsWithNavBar({ children }) {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}

ComponentsWithNavBar.propTypes = {
    children: propTypes.node.isRequired
}
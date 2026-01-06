import NavBar from "./NavBar";
import PropTypes from "prop-types";

export default function ComponentsWithNavBar({ children }) {
    return (
        <>
            <NavBar />
            <div className="container mx-auto p-6">{children}</div>
        </>
    );
}

ComponentsWithNavBar.propTypes = {
    children: PropTypes.node.isRequired,
};

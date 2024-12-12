// falta test
import { Link } from "react-router-dom";
import CartIcon from "../cartIcon/CartIcon";
import "./nav.css";

const Nav = () => {

    return (
        <nav className="nav">
            <div className="nav__content container">
                <div className="logo">
                    <div className="nav__logo-box">
                        <img className="nav__logo-image" src="./src/assets/icon-logo.webp" alt="Logo de Market" />
                        <span className="nav__logo-text">Market</span>
                    </div>
                    <div className="nav__links">
                        <Link to="/Products" className="nav__link">Productos</Link>
                    </div>
                </div>
                <div className="nav__cart-box">
                    <CartIcon />
                </div>
            </div>
        </nav>
    );
};
export default Nav;

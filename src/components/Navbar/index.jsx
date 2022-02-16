import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <Link to="/">Accueil</Link> | 
                <Link to="/Profile">Mon Profile</Link> | 
                <Link to="/Register">S'inscrire</Link> | 
                <Link to="/Login">Se connecter</Link>
            </ul>
        </nav>
    );
};

export default Navbar;
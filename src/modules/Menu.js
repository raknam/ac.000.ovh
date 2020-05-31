import React from "react";
import MenuItem from "./MenuItem";

import {faFish, faBug, faSkull, faUsers, faHome, faPalette} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

function Menu(props) {
    return (
        <aside
            className="sidenav-main nav-expanded nav-lock sidenav-light">
            <div className="brand-sidebar">
                <h1 className="logo-wrapper">
                    <Link className="brand-logo darken-1" to="/">
                        <img className="" src={process.env.PUBLIC_URL + "/images/favicon/mstile-144x144.png"} alt="site's logo"/>
                        <span className="logo-text hide-on-med-and-down">ac.000.ovh</span>
                    </Link>
                </h1>
            </div>

            <ul className="sidenav sidenav-collapsible leftside-navigation collapsible sidenav-fixed menu-shadow"
                id="slide-out" data-menu="menu-navigation" data-collapsible="menu-accordion">

                <MenuItem name="Home" fa_icon={faHome} link="/"/>
                <li>&nbsp;</li>
                <MenuItem name="Art" fa_icon={faPalette} link="/art"/>
                <MenuItem name="Bugs" fa_icon={faBug} link="/bugs"/>
                <MenuItem name="Fishes" fa_icon={faFish} link="/fishes" />
                <MenuItem name="Fossils" fa_icon={faSkull} link="/fossils" />
                <MenuItem name="Villagers" fa_icon={faUsers} link="/villagers" />
            </ul>

            <div className="navigation-background"></div>
        </aside>
    );
}

export default Menu;
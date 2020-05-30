import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {NavLink} from "react-router-dom";

const MenuItem = (props) => {
    const icon = props.fa_icon ? <FontAwesomeIcon icon={props.fa_icon} /> : <i className="material-icons">{props.icon}</i>;
    return (
        <li className="bold">
            <NavLink exact to={props.link} activeClassName="active gradient-45deg-green-teal gradient-shadow">
                {icon}
                <span className="menu-title">{props.name}</span>
            </NavLink>
        </li>
    );
};

export default MenuItem;
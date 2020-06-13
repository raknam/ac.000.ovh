import React, {Fragment} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoins, faMap, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function Header(props) {
    return (
        <header className="page-topbar" id="header">
            <div className="navbar navbar-fixed">
                <nav className="navbar-main navbar-color sideNav-lock navbar-dark brown darken-2">
                    <div className="nav-wrapper">
                        {/*
                        <div className="header-search-wrapper hide-on-med-and-down"><i
                            className="material-icons">search</i>
                            <input className="header-search-input z-depth-2" type="text" name="Search"
                                   placeholder="Search Database" data-search="template-list"/>
                                <ul className="search-list collection display-none"></ul>
                        </div>
                        */}
                        <ul className="navbar-list right">
                            <li>
                                <a className="waves-effect waves-block waves-light coins" href="#!">
                                    <i className="material-icons">shopping_cart</i>
                                    <span>150 000</span>&nbsp;
                                    <FontAwesomeIcon icon={faCoins}/>
                                </a>
                            </li>
                            <li className="dropdown-language">
                                <a className="waves-effect waves-block waves-light translation-button" href="#!"
                                data-target="translation-dropdown"><span className="flag-icon flag-icon-fr"></span></a>
                            </li>
                            <li>
                                <a href="#!" className="waves-effect waves-block waves-light profile-button" data-target="profile_dropdown">
                                    <span className="avatar-status">
                                        <img src={props.avatar} alt="avatar"/>
                                    </span>
                                </a>
                            </li>
                        </ul>

                        {/*
                        <ul className="dropdown-content" id="translation-dropdown">
                            <li className="dropdown-item"><a className="grey-text text-darken-1" href="!#"
                                                             data-language="en"><i
                                className="flag-icon flag-icon-gb"></i> English</a></li>
                            <li className="dropdown-item"><a className="grey-text text-darken-1" href="!#"
                                                             data-language="fr"><i
                                className="flag-icon flag-icon-fr"></i> French</a></li>
                        </ul>
                        */}

                        <ul className="userMenu dropdown-content" id="profile_dropdown">
                            <LoggedInMenu isSignedIn={props.isSignedIn} isFirstLogin={props.isFirstLogin} data={props.data}/>
                            <Connect
                                firebase={props.firebase}
                                isSignedIn={props.isSignedIn}/>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

function LoggedInMenu(props) {
    if (props.isSignedIn && !props.isFirstLogin) {
        return (
            <Fragment>
                <li>
                    <FontAwesomeIcon icon={faUser} className="mr-10"/> {props.data.island.player.ucfirst()}
                </li>
                <li>
                    <FontAwesomeIcon icon={faMap} className="mr-10"/> {props.data.island.name}
                </li>
                <li>
                    <FontAwesomeIcon icon={faCompass} className="mr-10"/> {props.data.island.hemisphere.ucfirst()}
                </li>
            </Fragment>
        );
    }
    return null;
}

function Connect(props) {
    if (props.isSignedIn) {
        //Logging out
        return (
            <li onClick={() => props.firebase.doSignOut()}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-10"/> Logout
            </li>
        );
    }
    //Logging in
    return (
        <li onClick={() => props.firebase.doSignInWithGoogle()}>
            <FontAwesomeIcon icon={faGoogle} className="mr-10"/> Sign in
        </li>
    );
}

export default Header;
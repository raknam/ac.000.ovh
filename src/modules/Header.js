import React, {Fragment} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {useGoogleLogin, useGoogleLogout} from "react-google-login";
import Config from "../config";

function Header(props) {
    return (
        <header className="page-topbar" id="header">
            <div className="navbar navbar-fixed">
                <nav className="navbar-main navbar-color sideNav-lock navbar-dark brown darken-2">
                    <div className="nav-wrapper">
                        <div className="header-search-wrapper hide-on-med-and-down"><i
                            className="material-icons">search</i>
                            <input className="header-search-input z-depth-2" type="text" name="Search"
                                   placeholder="Search Database" data-search="template-list"/>
                                <ul className="search-list collection display-none"></ul>
                        </div>
                        <ul className="navbar-list right">
                            <li className="dropdown-language">
                                <a className="waves-effect waves-block waves-light translation-button" href="!#"
                                data-target="translation-dropdown"><span className="flag-icon flag-icon-fr"></span></a>
                            </li>
                            <li className="hide-on-large-only search-input-wrapper"><a
                                className="waves-effect waves-block waves-light search-button"
                                href="!#"><i className="material-icons">search</i></a></li>
                            <li>
                                <a className="waves-effect waves-block waves-light profile-button" href="#" data-target="profile-dropdown">
                                    <span className="avatar-status">
                                        <img src={props.avatar} alt="avatar"/>
                                    </span>
                                </a>
                            </li>
                        </ul>

                        <ul className="dropdown-content" id="translation-dropdown">
                            <li className="dropdown-item"><a className="grey-text text-darken-1" href="!#"
                                                             data-language="en"><i
                                className="flag-icon flag-icon-gb"></i> English</a></li>
                            <li className="dropdown-item"><a className="grey-text text-darken-1" href="!#"
                                                             data-language="fr"><i
                                className="flag-icon flag-icon-fr"></i> French</a></li>
                        </ul>

                        <ul className="userMenu dropdown-content" id="profile-dropdown">
                            <LoggedInMenu isLoggedIn={props.isGoogleLogin} user={props.user}/>
                            <Connect
                                isLoggedIn={props.isGoogleLogin}
                                onLogin={props.onLogin}
                                onLogout={props.onLogout}/>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

function LoggedInMenu(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (
            <Fragment>
                <li>
                    <FontAwesomeIcon icon={faUser} className="mr-10"/> {props.user.island.player.ucfirst()}
                </li>
                <li>
                    <FontAwesomeIcon icon={faMap} className="mr-10"/> {props.user.island.name}
                </li>
                <li>
                    <FontAwesomeIcon icon={faCompass} className="mr-10"/> {props.user.island.hemisphere.ucfirst()}
                </li>
            </Fragment>
        );
    }
    return (null);
}

function Connect(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <GoogleSignOut onLogout={props.onLogout}/>;
    }
    return <GoogleSignIn onLogin={props.onLogin}/>;
}

function GoogleSignOut(props) {
    // eslint-disable-next-line
    const { signOut, loaded } = useGoogleLogout({
        clientId: Config().Google.ClientID,
        onLogoutSuccess: props.onLogout
    });

    return (
        // eslint-disable-next-line
        <li onClick={() => signOut()}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-10"/> Logout
        </li>
    );
}

function GoogleSignIn(props) {
    // eslint-disable-next-line
    const { signIn, loaded } = useGoogleLogin({
        clientId: Config().Google.ClientID,
        onSuccess: props.onLogin,
        onFailure: props.onLogin,
        isSignedIn: true
    });

    return (
        // eslint-disable-next-line
        <li onClick={() => signIn()}>
            <FontAwesomeIcon icon={faGoogle} className="mr-10"/> Sign in
        </li>
    )
}

export default Header;
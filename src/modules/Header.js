import React from "react";
import GoogleSignOut, {GoogleSignIn} from "./Google";

function Header(props) {
    return (
        <header className="page-topbar" id="header">
            <div className="navbar navbar-fixed">
                <nav className="navbar-main navbar-color nav-collapsible sideNav-lock navbar-light">
                    <div className="nav-wrapper">
                        <div className="header-search-wrapper hide-on-med-and-down"><i
                            className="material-icons">search</i>
                            <input className="header-search-input z-depth-2" type="text" name="Search"
                                   placeholder="Explore Materialize" data-search="template-list"/>
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
                            <li><a className="waves-effect waves-block waves-light sidenav-trigger" href="!#"
                                   data-target="slide-out-right"><i
                                className="material-icons">format_indent_increase</i></a></li>
                        </ul>

                        <ul className="dropdown-content" id="translation-dropdown">
                            <li className="dropdown-item"><a className="grey-text text-darken-1" href="!#"
                                                             data-language="en"><i
                                className="flag-icon flag-icon-gb"></i> English</a></li>
                            <li className="dropdown-item"><a className="grey-text text-darken-1" href="!#"
                                                             data-language="fr"><i
                                className="flag-icon flag-icon-fr"></i> French</a></li>
                            <li className="dropdown-item"><a className="grey-text text-darken-1" href="!#"
                                                             data-language="pt"><i
                                className="flag-icon flag-icon-pt"></i> Portuguese</a></li>
                            <li className="dropdown-item"><a className="grey-text text-darken-1" href="!#"
                                                             data-language="de"><i
                                className="flag-icon flag-icon-de"></i> German</a></li>
                        </ul>

                        <ul className="dropdown-content" id="profile-dropdown">
                            <li>
                                <Connect
                                    isLoggedIn={props.isGoogleLogin}
                                    onLogin={props.onLogin}
                                    onLogout={props.onLogout}/>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

function Connect(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <GoogleSignOut onLogout={props.onLogout}/>;
    }
    return <GoogleSignIn onLogin={props.onLogin}/>;
}

export default Header;
import React from "react";

function Menu(props) {
    return (
        <aside
            className="sidenav-main nav-expanded nav-lock nav-collapsible sidenav-dark gradient-45deg-deep-purple-blue sidenav-gradient sidenav-active-rounded">
            <div className="brand-sidebar">
                <h1 className="logo-wrapper">
                    <a className="brand-logo darken-1" href="index.html">
                        <img className="hide-on-med-and-down " src={process.env.PUBLIC_URL + "/images/logo/materialize-logo.png"} alt="materialize logo"/>
                        <img className="show-on-medium-and-down hide-on-med-and-up" src={process.env.PUBLIC_URL + "/images/logo/materialize-logo-color.png"} alt="materialize logo"/>
                        <span className="logo-text hide-on-med-and-down">Materialize</span>
                    </a>
                </h1>
            </div>
            <ul className="sidenav sidenav-collapsible leftside-navigation collapsible sidenav-fixed menu-shadow"
                id="slide-out" data-menu="menu-navigation" data-collapsible="menu-accordion">
                <li className="active bold">
                    <a className="collapsible-header waves-effect waves-cyan " href="!#">
                        <i className="material-icons">pages</i>
                        <span className="menu-title" data-i18n="Pages">Pages</span>
                    </a>
                    <div className="collapsible-body">
                        <ul className="collapsible collapsible-sub" data-collapsible="accordion">
                            <li className="active"><a className="active" href="page-blank.html">
                                <i className="material-icons">radio_button_unchecked</i>
                                <span data-i18n="Page Blank">Page Blank</span>
                            </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="navigation-header">
                    <a className="navigation-header-text" href="!#">Misc </a>
                    <i className="navigation-header-icon material-icons">more_horiz</i>
                </li>
                <li className="bold">
                    <a className="collapsible-header waves-effect waves-cyan " href="!#">
                        <i className="material-icons">photo_filter</i>
                        <span className="menu-title" data-i18n="Menu levels">Menu levels</span>
                    </a>
                    <div className="collapsible-body">
                        <ul className="collapsible collapsible-sub" data-collapsible="accordion">
                            <li>
                                <a href="!#">
                                    <i className="material-icons">radio_button_unchecked</i>
                                    <span data-i18n="Second level">Second level</span>
                                </a>
                            </li>
                            <li>
                                <a className="collapsible-header waves-effect waves-cyan" href="!#">
                                    <i className="material-icons">radio_button_unchecked</i>
                                    <span data-i18n="Second level child">Second level child</span>
                                </a>
                                <div className="collapsible-body">
                                    <ul className="collapsible" data-collapsible="accordion">
                                        <li>
                                            <a href="!#">
                                                <i className="material-icons">radio_button_unchecked</i>
                                                <span data-i18n="Third level">Third level</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="bold">
                    <a className="waves-effect waves-cyan " href="https://pixinvent.com/materialize-material-design-admin-template/documentation/" target="_blank" rel="noopener noreferrer">
                        <i className="material-icons">import_contacts</i>
                        <span className="menu-title" data-i18n="Documentation">Documentation</span>
                    </a>
                </li>
                <li className="bold">
                    <a className="waves-effect waves-cyan " href="https://pixinvent.ticksy.com/" target="_blank" rel="noopener noreferrer">
                        <i className="material-icons">help_outline</i>
                        <span className="menu-title" data-i18n="Support">Support</span>
                    </a>
                </li>
            </ul>
            <div className="navigation-background"></div>
            <a className="sidenav-trigger btn-sidenav-toggle btn-floating btn-medium waves-effect waves-light hide-on-large-only"
               href="!#" data-target="slide-out"><i className="material-icons">menu</i></a>
        </aside>
    );
}

export default Menu;
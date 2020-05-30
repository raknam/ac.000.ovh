import React from "react";

function Footer(props) {
    return (
        <footer className="page-footer footer footer-static footer-light white navbar-border navbar-shadow">
            <div className="footer-copyright">
                <div className="container">
                    <span>&copy; 2020 Raknam. All rights reserved.</span>
                    <span className="right hide-on-small-only">Developed by <a href="https://github.com/raknam" rel="noopener noreferrer" target="_blank">Raknam</a></span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
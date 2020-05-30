import React from "react";
import { Switch, Route } from "react-router-dom"
import HomePage from "../pages/Home";
import BugsPage from "../pages/Bugs";

export const ACNHAPI_BASEURL="https://acnhapi.com/v1a";

class Main extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div id="main">
                <div className="row">
                    <div className="col s12">
                        <div className="container">
                            <div className="section">
                                <Switch>
                                    <Route path="/bugs"><BugsPage /></Route>
                                    <Route exact path="/"><HomePage /></Route>
                                </Switch>
                            </div>
                            <div className="content-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Main;
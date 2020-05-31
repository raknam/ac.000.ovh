import React from "react";
import { Switch, Route } from "react-router-dom"
import HomePage from "../pages/Home";
import BugsPage from "../pages/Bugs";
import FishesPage from "../pages/Fishes";

export const ACNHAPI_BASEURL="https://acnhapi.com/v1a";

class Main extends React.Component {
    render() {
        return (
            <div id="main">
                <div className="row">
                    <div className="col s12">
                        <div className="container">
                            <div className="section">
                                <Switch>
                                    <Route path="/bugs"><BugsPage /></Route>
                                    <Route path="/fishes"><FishesPage /></Route>
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
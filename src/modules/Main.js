import React from "react";
import { Switch, Route } from "react-router-dom"
import HomePage from "../pages/Home";
import InsectsPage from "../pages/Insects";
import FishesPage from "../pages/Fishes";
import FossilsPage from "../pages/Fossils";
import VillagersPage from "../pages/Villagers";
import ArtPage from "../pages/Art";

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
                                    <Route path={this.props.routing.art}><ArtPage language={this.props.language} /></Route>
                                    <Route path={this.props.routing.insects}><InsectsPage language={this.props.language} /></Route>
                                    <Route path={this.props.routing.fishes}><FishesPage language={this.props.language} /></Route>
                                    <Route path={this.props.routing.fossils}><FossilsPage language={this.props.language} /></Route>
                                    <Route path={this.props.routing.villagers}><VillagersPage language={this.props.language} /></Route>
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
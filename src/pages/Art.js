import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import Card from "../modules/Card";

const defaultState = {
    isLoaded: false,
    arts: []
};

class ArtPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/art")
            .then(res => res.json())
            .then(
                (result) => { this.setState({ isLoaded: true, arts: result, }) },
                (error) => { this.setState(Object.assign({ error }, defaultState)); }
            )
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content row arts">
                    {this.state.arts.map((art) =>
                        <Card class="Art"
                              icon={art.image_uri}
                              name={art.name["name-EUfr"].toLowerCase().ucfirst()}
                              key={art.id}>
                            <p className="price">
                                <FontAwesomeIcon icon={faCoins}/> {art['sell-price']}
                            </p>
                        </Card>
                    )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ArtPage;
import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Card from "../modules/Card"

const defaultState = {
    isLoaded: false,
    fossils: []
};

class FossilsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/fossils")
            .then(res => res.json())
            .then(
                (result) => { this.setState({ isLoaded: true, fossils: result, }) },
                (error) => { this.setState(Object.assign({ error }, defaultState)); }
            )
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content row fossils">
                    {this.state.fossils.map((fossil) =>
                        <Card class="Fossil"
                              icon={fossil.image_uri}
                              name={fossil.name["name-EUfr"].toLowerCase().ucfirst()}
                              key={fossil['file-name']}>
                            <p className="price">
                                <FontAwesomeIcon icon={faCoins}/> {fossil.price}
                            </p>
                        </Card>
                    )}
                    </div>
                </div>
            </div>
        );
    }
}

export default FossilsPage;
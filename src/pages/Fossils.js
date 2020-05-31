import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

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
                    {this.state.fossils.map((fossil) => <FossilCard fossil={fossil} key={fossil['file-name']}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

const FossilCard = (props) => (
    <div className="mosaique">
        <div className="fond">
            <img src={props.fossil.image_uri} alt="Fossil"/>
        </div>
        <h4 className="name2"> {props.fossil.name["name-EUfr"].toLowerCase().ucfirst()} </h4>
        <p className="price">
            <FontAwesomeIcon icon={faCoins}/> {props.fossil.price}
        </p>
    </div>
);

export default FossilsPage;
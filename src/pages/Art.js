import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";

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
                    {this.state.arts.map((art) => <ArtCard art={art} key={art.id}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

const ArtCard = (props) => (
    <div className="mosaique">
        <div className="fond">
            <img src={props.art.image_uri} alt=""/>
        </div>
        <h4 className="name2"> {props.art.name["name-EUfr"].toLowerCase().ucfirst()} </h4>
        <p className="price">
            <FontAwesomeIcon icon={faCoins}/> {props.art['sell-price']}
        </p>
    </div>
);

export default ArtPage;
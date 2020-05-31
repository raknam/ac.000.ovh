import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt, faCoins } from "@fortawesome/free-solid-svg-icons";

const defaultState = {
    isLoaded: false,
    fishes: []
};

class FishesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/fish")
            .then(res => res.json())
            .then(
                (result) => { this.setState({ isLoaded: true, fishes: result, }) },
                (error) => { this.setState(Object.assign({ error }, defaultState)); }
            )
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content row fishes">
                    {this.state.fishes.map((fish) => <FishCard fish={fish} key={fish.id}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

const FishCard = (props) => (
    <div className="mosaique">
        <div className="fond">
            <img src={props.fish.icon_uri} alt="Fish"/>
        </div>
        <h4 className="name2"> {props.fish.name["name-EUfr"].toLowerCase().ucfirst()} </h4>
        <p className="period">
            <FontAwesomeIcon icon={faCalendarAlt}/> {props.fish.availability["month-northern"]}
        </p>
        <p className="time">
            <FontAwesomeIcon icon={faClock}/> {props.fish.availability.time}
        </p>
        <p className="location">
            <FontAwesomeIcon icon={faMapMarkerAlt}/> {props.fish.availability.location}
        </p>
        <p className="price">
            <FontAwesomeIcon icon={faCoins}/> {props.fish.price}
        </p>
        <p className="rarity"> {props.fish.availability.rarity} </p>
    </div>
);

export default FishesPage;
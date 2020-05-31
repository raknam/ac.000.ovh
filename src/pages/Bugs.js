import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt, faCoins } from "@fortawesome/free-solid-svg-icons";

const defaultState = {
    isLoaded: false,
    bugs: []
};

class BugsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/bugs")
            .then(res => res.json())
            .then(
                (result) => { this.setState({ isLoaded: true, bugs: result }) },
                (error) => { this.setState(Object.assign({ error }, defaultState)); }
            )
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content row bugs">
                    {this.state.bugs.map((bug) => <BugCard bug={bug} key={bug.id}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

const BugCard = (props) => (
    <div className="mosaique">
        <div className="fond">
            <img src={props.bug.icon_uri} alt="Bug"/>
        </div>
        <h4 className="name2"> {props.bug.name["name-EUfr"].toLowerCase().ucfirst()} </h4>
        <p className="period">
            <FontAwesomeIcon icon={faCalendarAlt}/> {props.bug.availability["month-northern"]}
        </p>
        <p className="time">
            <FontAwesomeIcon icon={faClock}/> {props.bug.availability.time}
        </p>
        <p className="location">
            <FontAwesomeIcon icon={faMapMarkerAlt}/> {props.bug.availability.location}
        </p>
        <p className="price">
            <FontAwesomeIcon icon={faCoins}/> {props.bug.price}
        </p>
        <p className="rarity"> {props.bug.availability.rarity} </p>
    </div>
);

export default BugsPage;
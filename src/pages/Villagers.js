import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGift, faPaw, faVenusMars} from "@fortawesome/free-solid-svg-icons";

const defaultState = {
    isLoaded: false,
    villagers: []
};

class VillagersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/villagers")
            .then(res => res.json())
            .then(
                (result) => { this.setState({ isLoaded: true, villagers: result, }) },
                (error) => { this.setState(Object.assign({ error }, defaultState)); }
            )
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content row villagers">
                    {this.state.villagers.map((villager) => <VillagerCard villager={villager} key={villager.id}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

const VillagerCard = (props) => (
    <div className="mosaique">
        <div className="fond">
            <img src={props.villager.icon_uri} alt={props.villager.name["name-EUfr"].toLowerCase().ucfirst()}/>
        </div>
        <h4 className="name2"> {props.villager.name["name-EUfr"].toLowerCase().ucfirst()} </h4>
        <p className="birthday">
            <FontAwesomeIcon icon={faGift}/> {props.villager["birthday-string"]}
        </p>
        <p className="species">
            <FontAwesomeIcon icon={faPaw}/> {props.villager.species}
        </p>
        <p className="gender">
            <FontAwesomeIcon icon={faVenusMars}/> {props.villager.gender}
        </p>
    </div>
);

export default VillagersPage;
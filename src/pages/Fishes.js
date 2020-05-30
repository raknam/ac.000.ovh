import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt, faCoins } from "@fortawesome/free-solid-svg-icons";

class FishesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            fishes: []
        }
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/fish")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        fishes: result,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        fishes: [],
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content row fishes">
                    {this.state.fishes.map((fish) => <FishCard fish={fish}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

class FishCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fish: props.fish
        }
    }

    render() {
        return (
            <div key={this.state.fish.id} className="mosaique">
                <div className="fond">
                    <img src={this.state.fish.icon_uri}/>
                </div>
                <h4 className="name2">
                    {this.state.fish.name["name-EUfr"].toLowerCase().ucfirst()}
                </h4>
                <p className="period">
                    <FontAwesomeIcon icon={faCalendarAlt}/> {this.state.fish.availability["month-northern"]}
                </p>
                <p className="time">
                    <FontAwesomeIcon icon={faClock}/> {this.state.fish.availability.time}
                </p>
                <p className="location">
                    <FontAwesomeIcon icon={faMapMarkerAlt}/> {this.state.fish.availability.location}
                </p>
                <p className="price">
                    <FontAwesomeIcon icon={faCoins}/> {this.state.fish.price}
                </p>
                <p className="rarity">
                    {this.state.fish.availability.rarity}
                </p>
            </div>
        );
    }
}

export default FishesPage;
import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt, faCoins } from "@fortawesome/free-solid-svg-icons";

class BugsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            bugs: []
        }
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/bugs")
            .then(res => res.json())
            .then(
                (result) => { this.setState({ isLoaded: true, bugs: result }) },
                (error) => { this.setState({ isLoaded: true, bugs: [], error }); }
            )
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content row bugs">
                    {this.state.bugs.map((bug) => <BugCard bug={bug}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

class BugCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bug: props.bug
        }
    }

    render() {
        return (
            <div key={this.state.bug.id} className="mosaique">
                <div className="fond">
                    <img src={this.state.bug.icon_uri}/>
                </div>
                <h4 className="name2">
                    {this.state.bug.name["name-EUfr"].toLowerCase().ucfirst()}
                </h4>
                <p className="period">
                    <FontAwesomeIcon icon={faCalendarAlt}/> {this.state.bug.availability["month-northern"]}
                </p>
                <p className="time">
                    <FontAwesomeIcon icon={faClock}/> {this.state.bug.availability.time}
                </p>
                <p className="location">
                    <FontAwesomeIcon icon={faMapMarkerAlt}/> {this.state.bug.availability.location}
                </p>
                <p className="price">
                    <FontAwesomeIcon icon={faCoins}/> {this.state.bug.price}
                </p>
                <p className="rarity">
                    {this.state.bug.availability.rarity}
                </p>
            </div>
        );
    }
}

export default BugsPage;
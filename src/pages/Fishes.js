import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {faMapMarkerAlt, faCoins, faSort} from "@fortawesome/free-solid-svg-icons";
import Card from "../modules/Card";
import {formatMoney, formatMonthRange, formatTimeRange} from "../App";

const defaultState = {
    isLoaded: false,
    fishes: [],
    language: "EUfr",
};

class FishesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign(defaultState, {language: this.props.language});
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/fish")
            .then(res => res.json())
            .then(
                (result) => {
                    result.sort((a, b) => a.name["name-"+this.state.language].localeCompare(b.name["name-"+this.state.language]));
                    this.setState(Object.assign(this.state, { isLoaded: true, fishes: result }));
                },
                (error) => { this.setState(Object.assign(this.state, { error })); }
            )
    }

    getRarityBadge(rarity) {
        switch (rarity) {
            case "Common": return "";
            case "Uncommon":
                return <span className="new badge gradient-45deg-yellow-teal black-text" data-badge-caption="">Incommun</span>;
            case "Rare":
                return <span className="new badge gradient-45deg-orange-deep-orange black-text" data-badge-caption="">Rare</span>;
            case "Ultra-rare":
                return <span className="new badge gradient-45deg-red-pink black-text" data-badge-caption="">Tr&egrave;s rare</span>;
            default: return rarity;
        }
    }

    getLocation(raw_location) {
        switch (raw_location) {
            default: console.warn("Missing trad: ", raw_location); return "NOTRAD: " + raw_location;
            case "Pier": return "Ponton";
            case "Pond": return "Etang";
            case "River": return "Rivière";
            case "River (Clifftop)": return "Rivière (falaise)";
            case "River (Clifftop) & Pond": return "Rivière (falaise) & Etang";
            case "River (Mouth)": return "Rivière (embouchure)";
            case "Sea": return "Océan";
            case "Sea (when raining or snowing)": return "Océan (pluie ou neige)";
        }
    }

    getSize(size) {
        switch (size) {
            default: console.warn("Missing trad: ", size); return "NOTRAD: " + size;
            case "Smallest (1)": return "Minuscule [1]";
            case "Small (2)": return "Petit [2]";
            case "Medium (3)": return "Moyen [3]";
            case "Medium (4)": return "Grand [4]";
            case "Medium with fin (4)": return "Grand (aileron) [4]";
            case "Large (4)": return "Grand [4]";
            case "Large (5)": return "Très grand [5]";
            case "Largest (6)": return "Enorme [6]";
            case "Largest with fin (6)": return "Enorme (aileron) [6]";
            case "Narrow": return "Fin";
        }
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content row fishes">
                    {this.state.fishes.map((fish) =>
                        <Card class="Fish"
                              icon={fish.icon_uri}
                              name={fish.name["name-"+this.state.language].toLowerCase().ucfirst()}
                              key={fish.id}>
                            <p className="rarity">
                                {this.getRarityBadge(fish.availability.rarity)}
                            </p>
                            <p className="price">
                                <FontAwesomeIcon icon={faCoins}/>{formatMoney(fish.price)}
                            </p>
                            <p className="period">
                                <FontAwesomeIcon icon={faCalendarAlt}/>
                                {fish.availability.isAllYear ? "Toute l'année" : formatMonthRange(fish.availability["month-northern"])}
                            </p>
                            <p className="time">
                                <FontAwesomeIcon icon={faClock}/>
                                {fish.availability.isAllDay ? "Toute la journée" : formatTimeRange(fish.availability.time)}
                            </p>
                            <p className="size">
                                <FontAwesomeIcon icon={faSort}/>{this.getSize(fish.shadow)}
                            </p>
                            <p className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt}/>{this.getLocation(fish.availability.location)}
                            </p>
                        </Card>
                    )}
                    </div>
                </div>
            </div>
        );
    }
}

export default FishesPage;
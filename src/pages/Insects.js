import React from "react";
import { ACNHAPI_BASEURL } from "../modules/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt, faCoins } from "@fortawesome/free-solid-svg-icons";
import Card from "../modules/Card";
import {formatMoney, formatMonthRange, formatTimeRange} from "../App";

const defaultState = {
    isLoaded: false,
    insects: []
};

class InsectsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/bugs")
            .then(res => res.json())
            .then(
                (result) => {
                    result.sort((a, b) => a.name["name-EUfr"].localeCompare(b.name["name-EUfr"]));
                    this.setState({isLoaded: true, insects: result})
                },
                (error) => {
                    this.setState(Object.assign({error}, defaultState));
                }
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
            case "": return "Partout";
            case "Flying": return "En vol, partout";
            case "Flying by light": return "La nuit, vers les lumières";
            case "Flying near hybrid flowers": return "Sur les fleurs hybrides";
            case "Hitting rocks": return "Dans les rochers";
            case "Near trash": return "Autour des déchets";
            case "On beach rocks": return "Sur les rochers de la plage";
            case "On flowers": return "Sur les fleurs";
            case "On ponds and rivers": return "Sur l'eau";
            case "On palm trees": return "Sur les palmiers";
            case "On rocks (when raining)": return "Sur les rochers (pluie)";
            case "On rotten food": return "Sur les navets pourris";
            case "On the beach": return "Sur la plage";
            case "On the ground": return "Au sol, partout";
            case "On tree stumps": return "Sur les souches d'arbre";
            case "On trees": return "Sur les troncs d'arbre";
            case "On villagers": return "Sur les villageois";
            case "On white flowers": return "Sur les fleurs blanches";
            case "Shaking trees": return "En secouant les arbres";
            case "Under trees": return "Sous les arbres";
            case "Underground": return "Sous terre";
        }
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-action">

                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                    </div>
                    <div className="card-content row bugs">
                        {this.state.insects.map((insect) =>
                            <Card class="Insect"
                                  icon={insect.icon_uri}
                                  name={insect.name["name-EUfr"].toLowerCase().ucfirst()}
                                  key={insect.id}>
                                <p className="rarity">
                                    {this.getRarityBadge(insect.availability.rarity)}
                                </p>
                                <p className="price">
                                    <FontAwesomeIcon icon={faCoins}/>{formatMoney(insect.price)}
                                </p>
                                <p className="period">
                                    <FontAwesomeIcon icon={faCalendarAlt}/>
                                    {insect.availability.isAllYear ? "Toute l'année" : formatMonthRange(insect.availability["month-northern"])}
                                </p>
                                <p className="time">
                                    <FontAwesomeIcon icon={faClock}/>
                                    {insect.availability.isAllDay ? "Toute la journée" : formatTimeRange(insect.availability.time)}
                                </p>
                                <p className="location">
                                    <FontAwesomeIcon icon={faMapMarkerAlt}/>{this.getLocation(insect.availability.location)}
                                </p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default InsectsPage;
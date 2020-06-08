import React from "react";
import Select from 'react-select';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGift, faPaw, faVenusMars} from "@fortawesome/free-solid-svg-icons";

import { ACNHAPI_BASEURL } from "../modules/Main";
import Card from "../modules/Card";

const defaultState = {
    isLoaded: false,
    villagers: [],
    species: [],
    language: "EUfr",
    filter_species: [],
    filter_gender: {male:true, female:true},
    filtered_villagers: []
};

class VillagersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({language: this.props.language}, defaultState);
        this.handleSpeciesChange = this.handleSpeciesChange.bind(this);
    };

    componentDidMount() {
        fetch(ACNHAPI_BASEURL + "/villagers")
            .then(res => res.json())
            .then(
                (result) => {
                    result.sort((a, b) => a.name["name-"+this.state.language].localeCompare(b.name["name-"+this.state.language]));
                    let species = result
                        .map((villager) => villager.species)
                        .filter((v, i, a) => a.indexOf(v) === i)
                        .map((sp) => ({label: sp, value: sp}))
                        .sort((a,b) => a.label.localeCompare(b.label));
                    this.setState(Object.assign(defaultState, {
                        isLoaded: true,
                        villagers: result,
                        species,
                        filtered_villagers: result,
                    }));
                },
                (error) => { this.setState(Object.assign(defaultState, { error })); }
            )
    }

    handleSpeciesChange(values) {
        let filter_species = values.map((sp) => sp.value);
        let filtered_villagers = filter_species.length > 0 ?
            this.state.villagers
                .filter((villager) => filter_species.indexOf(villager.species) >= 0) :
            this.state.villagers;

        this.setState(Object.assign(this.state, {filter_species, filtered_villagers}));
    }

    handleGenderChange(event) {
        console.log("gender handle", event);
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="col m8">
                                <div className="input-field">
                                    <Select isMulti onChange={this.handleSpeciesChange} options={this.state.species}
                                        placeholder="Espèces"/>
                                </div>
                            </div>
                            <div className="col m2">
                                <label>Genre</label>
                                <br/>
                                <label><input type="checkbox" checked={this.state.filter_gender.male} data-gender="male"
                                              onChange={this.handleGenderChange}/><span>Male</span></label>
                                <br />
                                <label><input type="checkbox" checked={this.state.filter_gender.female} data-gender="female"
                                              onChange={this.handleGenderChange}/><span>Femelle</span></label>
                            </div>
                            <div className="col m2 switch">
                                <label>Sélectionné</label>
                                <br/>
                                <label>Non<input type="checkbox"/><span className="lever"></span>Oui</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-content row villagers">
                    {this.state.filtered_villagers.map((villager) =>
                        <Card class="Villager"
                              icon={villager.icon_uri}
                              name={villager.name["name-"+this.state.language].toLowerCase().ucfirst()}
                              key={villager.id}>
                            <p className="birthday">
                                <FontAwesomeIcon icon={faGift}/> {villager["birthday-string"]}
                            </p>
                            <p className="species">
                                <FontAwesomeIcon icon={faPaw}/> {villager.species}
                            </p>
                            <p className={"gender " + (villager.gender === "Male" ? "blue-text" : "pink-text")}>
                                <FontAwesomeIcon icon={faVenusMars}/>{villager.gender}
                            </p>
                        </Card>
                    )}
                    </div>
                </div>
            </div>
        );
    }
}

export default VillagersPage;
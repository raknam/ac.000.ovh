import React from "react";
import {ACNHAPI_BASEURL} from "../modules/Main";

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
                (result) => {
                    this.setState({
                        isLoaded: true,
                        bugs: result,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        bugs: [],
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-content row">
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nom</th>
                                    <th>Vente</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.bugs.map((bug) => {
                                return (
                                <tr key={bug.id}>
                                    <td><img src={bug.icon_uri} style={{ maxHeight: "50px", maxWidth: "50px" }}/></td>
                                    <td>{bug.name["name-EUfr"].toLowerCase().ucfirst()}</td>
                                    <td><img src="https://acnhcdn.com/latest/MenuIcon/MoneyBag069.png" style={{ height: "30px" }}/> {bug.price}</td>
                                    <td>&nbsp;</td>
                                </tr>
                                );
                            })}
                            </tbody>
                            <colgroup>
                                <col style={{width:"70px"}}/>
                                <col/>
                                <col/>
                            </colgroup>
                        </table>
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
            <div>{this.state.bug.name}</div>
        );
    }
}

export default BugsPage;
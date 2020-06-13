import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            icon: props.icon,
            details: props.children,
            class: props.class,
        };
    };

    render() {
        let cartIcon = this.props.enableCart === true ? (
            <a href="#" className="addCart waves-effect waves-light">
                {/*<FontAwesomeIcon icon={faCartPlus}/>*/}
                <i className="material-icons">add_shopping_cart</i>
            </a>
        ) : null;

        return (
            <div className="mosaique">
                <div className="fond">
                    <img src={this.state.icon} alt={this.state.class}/>
                </div>
                <div className="switch catched">
                    <label>
                        <input type="checkbox"/>
                        <span className="lever"></span>
                    </label>
                </div>
                {cartIcon}
                <h4 className="name2"> {this.state.name} </h4>
                {this.state.details}
            </div>
        );
    }
}

export default Card;

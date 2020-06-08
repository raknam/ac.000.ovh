import React from "react";

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
                <h4 className="name2"> {this.state.name} </h4>
                {this.state.details}
            </div>
        );
    }
}

export default Card;

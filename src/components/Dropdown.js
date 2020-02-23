import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selectedOption: ""
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            options: this.props.options,
            selectedOption: this.props.selectedOption
        });
    }

    componentWillReceiveProps(nextProps) {
        let options = nextProps.options;
        this.setState({
            options: options
        });
    }

    handleOnClick() {
        let selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        this.props.selectedValue(selectedValue);
    }

    render() {
        return (
            <select id="selectBox" onChange={this.handleOnClick}>
                {this.state.options && this.state.options && this.state.options.map((option, key) => {
                    if (this.state.selectedOption !== "" && option === this.state.selectedOption) {
                        return <option selected key={key} value={option}>{option}</option>;
                    }
                    else {
                        return <option key={key} value={option}>{option}</option>;
                    }
                })}
            </select>
        )
    }
}

export default Dropdown;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pricingInfo } from '../productsData';
import Dropdown from './Dropdown';
import { updateProduct } from '../redux/actions/productActions';
import { NavLink } from 'react-router-dom';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }
    state = {
        name: this.props.product ? this.props.product.name : null,
        weight: this.props.product ? this.props.product.weight : null,
        availability: this.props.product ? this.props.product.availability : null,
        productUrl: this.props.product ? this.props.product.productUrl : null,
        pricingTier: this.props.product ? this.props.product.pricingTier : null,
        priceRange: this.props.product ? this.props.product.priceRange : null,
        isEditable: this.props.product ? this.props.product.isEditable : null
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeCheckbox(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    onSubmit(e) {
        e.preventDefault();
        const product = {
            id: this.props.product.id,
            name: this.state.name,
            weight: this.state.weight,
            availability: this.state.availability,
            productUrl: this.state.productUrl,
            pricingTier: this.state.pricingTier,
            priceRange: this.state.priceRange,
            isEditable: this.state.isEditable
        }
        this.props.updateProduct(product);
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <h3>EDIT PRODUCT</h3>
                {this.props.product != null ?


                    <form onSubmit={this.onSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="productName">Name: </label></td>
                                    <td><input type="text" name="name" id="productName"
                                        defaultValue={this.state.name}
                                        onChange={this.onChange}
                                        required
                                    /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="productWeight">Weight: </label></td>
                                    <td><input type="text" name="weight" id="productWeight"
                                        defaultValue={this.state.weight}
                                        onChange={this.onChange}
                                        required
                                    /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="productAvailability">Availability: </label></td>
                                    <td><input type="number" name="availability" id="productAvailability"
                                        defaultValue={this.state.availability}
                                        onChange={this.onChange}
                                    /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="productURL">Product Url: </label></td>
                                    <td><input type="text" name="url" id="productURL"
                                        defaultValue={this.state.productUrl}
                                        onChange={this.onChange}
                                        required
                                    /></td>
                                </tr>
                                <tr>
                                    <td><label>Price Tier </label></td>
                                    <td>
                                        <input onChange={this.onChange} type="radio" name="pricingTier" id="productBudget" value="budget" defaultChecked={(this.state.pricingTier === "budget")} />
                                        <label htmlFor="productBudget">Budget</label>
                                        <input onChange={this.onChange} type="radio" name="pricingTier" id="productPremier" value="premier" defaultChecked={(this.state.pricingTier === "premier")} />
                                        <label htmlFor="productPremier">Premier</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="productPriceRange">Price Range</label></td>
                                    <td>
                                        <Dropdown options={pricingInfo[this.state.pricingTier]} selectedOption={this.state.priceRange}
                                            selectedValue={(val) => this.onChange({ target: { name: "priceRange", value: val } })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="productIsEditable">Is Editable</label></td>
                                    <td><input onChange={this.onChangeCheckbox} type="checkbox" name="isEditable" id="productIsEditable"
                                        defaultChecked={this.state.isEditable}
                                    /></td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: "center" }}><button type="submit">Submit</button></td>
                                    <td style={{ textAlign: "center" }}>
                                        <NavLink to={"/"}>
                                            <button>Back</button>
                                        </NavLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    : <h3>No product found!</h3>}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    if (parseInt(props.match.params.id)) {
        return {
            product: state.productsData.products.find(item => item.id === parseInt(props.match.params.id)) ? state.productsData.products.find(item => item.id === parseInt(props.match.params.id)) : null
        }
    }

    return { product: null };
}

export default connect(mapStateToProps, { updateProduct })(EditProduct);
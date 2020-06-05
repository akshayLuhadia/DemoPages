import React, { Component } from "react";
import { connect } from "react-redux";
import { pricingInfo } from "../productsData";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { updateProduct } from "../redux/actions/productActions";
import { NavLink } from "react-router-dom";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { ChoiceGroup } from "office-ui-fabric-react/lib/ChoiceGroup";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";

const options = [
  { key: "budget", text: "Budget" },
  { key: "premier", text: "Premier" },
];

let pricingInfoItems = {
  budget: pricingInfo["budget"].map((item, key) => {
    return { key: item, text: item };
  }),
  premier: pricingInfo["premier"].map((item, key) => {
    return { key: item, text: item };
  }),
};

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChoiceChange = this.onChoiceChange.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }
  state = {
    name: this.props.product ? this.props.product.name : null,
    weight: this.props.product ? this.props.product.weight : null,
    availability: this.props.product ? this.props.product.availability : null,
    productUrl: this.props.product ? this.props.product.productUrl : null,
    pricingTier: this.props.product ? this.props.product.pricingTier : null,
    priceRange: this.props.product ? this.props.product.priceRange : null,
    isEditable: this.props.product ? this.props.product.isEditable : null,
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeCheckbox(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  onChoiceChange(e, option) {
    this.setState({ [e.target.name]: option.key });
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
      isEditable: this.state.isEditable,
    };
    this.props.updateProduct(product);
    this.props.history.push("/DemoPages");
  }

  render() {
    return (
      <Fabric>
        <h3>EDIT PRODUCT</h3>
        {this.props.product != null ? (
          <form onSubmit={this.onSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Label htmlFor="productName">Name: </Label>
                  </td>
                  <td>
                    <TextField
                      name="name"
                      id="productName"
                      defaultValue={this.state.name}
                      onChange={this.onChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label htmlFor="productWeight">Weight: </Label>
                  </td>
                  <td>
                    <TextField
                      type="text"
                      name="weight"
                      id="productWeight"
                      defaultValue={this.state.weight}
                      onChange={this.onChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label htmlFor="productAvailability">Availability: </Label>
                  </td>
                  <td>
                    <TextField
                      type="number"
                      name="availability"
                      id="productAvailability"
                      defaultValue={this.state.availability}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label htmlFor="productURL">Product Url: </Label>
                  </td>
                  <td>
                    <TextField
                      type="text"
                      name="url"
                      id="productURL"
                      defaultValue={this.state.productUrl}
                      onChange={this.onChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label>Price Tier </Label>
                  </td>
                  <td>
                    <ChoiceGroup
                      selectedKey={this.state.pricingTier}
                      options={options}
                      onChange={this.onChoiceChange}
                      name="pricingTier"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label htmlFor="productPriceRange">Price Range</Label>
                  </td>
                  <td>
                    <Dropdown
                      id="productPriceRange"
                      options={pricingInfoItems[this.state.pricingTier]}
                      defaultSelectedKey={this.state.priceRange}
                      onChange={(e, option) =>
                        this.setState({ priceRange: option.text })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label htmlFor="productIsEditable">Is Editable</Label>
                  </td>
                  <td>
                    <Toggle
                      defaultChecked={this.state.isEditable}
                      onText="Editable"
                      offText="Not Editable"
                      onChange={this.onChangeCheckbox}
                      name="isEditable"
                      id="productIsEditable"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <NavLink to={"/DemoPages"}>
                      <DefaultButton text="Back" />
                    </NavLink>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <PrimaryButton type="submit" text="Submit" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        ) : (
          <h3>No product found!</h3>
        )}
      </Fabric>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (parseInt(props.match.params.id)) {
    return {
      product: state.productsData.products.find(
        (item) => item.id === parseInt(props.match.params.id)
      )
        ? state.productsData.products.find(
            (item) => item.id === parseInt(props.match.params.id)
          )
        : null,
    };
  }

  return { product: null };
};

export default connect(mapStateToProps, { updateProduct })(EditProduct);

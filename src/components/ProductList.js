import React from "react";
import { connect } from "react-redux";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { DetailsList } from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "react-router-dom";
import "./ProductList.css";

const _columns = [
  {
    key: "column1",
    name: "Name",
    fieldName: "name",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "column2",
    name: "Weight",
    fieldName: "weight",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "column3",
    name: "Availability",
    fieldName: "availability",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "column3",
    name: "",
    fieldName: "edit",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
];

const ProductList = ({ products }) => (
  <Fabric>
    <div>
      <h1>Product List</h1>
      {products && products.length ? (
        <DetailsList
          columns={_columns}
          // selectionMode="single"
          items={products}
        ></DetailsList>
      ) : (
        "No products found"
      )}
    </div>
  </Fabric>
);

const mapItem = (products) => {
  return products.map((item) => {
    let productItem = item;
    if (productItem.isEditable) {
      productItem.edit = (
        <Link to={`/Products/edit-product/${productItem.id}`}>
          <button>EDIT</button>
        </Link>
      );
    } else {
      productItem.edit = "";
    }
    return productItem;
  });
};

const mapStateToProps = (state) => {
  let products = state.productsData.products;
  products = mapItem(products);
  return { products };
};

export default connect(mapStateToProps)(ProductList);

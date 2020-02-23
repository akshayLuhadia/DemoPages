import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';

const style = {
    width: "50%",
    textAlign: "left"
}

const ProductList = ({ products }) => (
    <div>
        <h1>Product List</h1>
        <table style={style}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Availability</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products && products.length
                    ? products.map((product, index) => {
                        return <Product key={index} product={product} />
                    })
                    : "No products!"
                }
            </tbody>
        </table>
    </div>
);

const mapStateToProps = state => {
    const products = state.productsData.products
    return { products };
}

export default connect(mapStateToProps)(ProductList);
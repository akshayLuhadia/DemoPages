import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Product = ({ product }) => (
    <tr>
        <td>{product.name}</td>
        <td>{product.weight}</td>
        <td>{product.availability}</td>
        <td>
            {product.isEditable ?
                <Link to={`/DemoPages/edit-product/${product.id}`}>
                    <button>EDIT</button>
                </Link>
                : ""}
        </td>
    </tr>
);

export default connect()(Product);
import { UPDATE_PRODUCT, GET_ALL_PRODUCTS } from '../actions/types';
import { products } from '../../productsData';

const productsData = products.map((item, key) => { return { ...item, id: key + 1 } });
const initialState = {
    products: productsData
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: productsData
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map((item) => {
                    if (item.id === action.payload.product.id) {
                        return action.payload.product;
                    }
                    else {
                        return item;
                    }
                })
            }
        default:
            return state;
    }
}
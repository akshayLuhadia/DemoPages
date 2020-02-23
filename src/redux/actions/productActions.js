import { GET_ALL_PRODUCTS, UPDATE_PRODUCT } from './types';

export const getAllProducts = () => ({
    type: GET_ALL_PRODUCTS,
    payload: {}
});

export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: { product }
});
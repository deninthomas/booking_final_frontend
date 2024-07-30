import { Post, Get, Put, Delete } from "../authHttpClient";

const baseName = "/products";

const getProductsURL = `${baseName}/get-products`;
const getProductItemURL = `${baseName}/get-product`;
const createProductsURL = `${baseName}/create-product`;
const udpateProductsURL = `${baseName}/update-product`;
const deleteProductsURL = `${baseName}/delete-product`;

export const getProductsLIst = () => {
    return Get(getProductsURL);
};
export const getProduct = (request) => {
    return Post(getProductItemURL, request);
};
export const CreateProducts = (request) => {
    return Post(createProductsURL, request, true);
};
export const UpdateProducts = (request) => {
    return Put(udpateProductsURL, request);
};
export const DeleteProducts = (request) => {
    return Delete(deleteProductsURL + `/${request.id}`, request);
};

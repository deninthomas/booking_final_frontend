import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductForm } from '../../components/AddProduct';
import { getProduct } from '../../serviceHandlers/services/productAccess';
import { useDispatch } from 'react-redux';
import { setForm } from '../../redux/productSlice';

export const ManageProduct = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("id");

    const getCurrentProduct = async () => {
        const result = await getProduct({ id: productId });
        dispatch(setForm(result.response))
    }

    useEffect(() => {
        if (productId)
            getCurrentProduct()
    }, [])

    return <ProductForm isEdit={!!productId}/>

}
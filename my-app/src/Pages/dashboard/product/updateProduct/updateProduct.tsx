import React from 'react'
import UpdateProductForm from './updateProductForm'
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../../api/productApi';
import useSWR from 'swr';

const UpdateProductPage = () => {
    const { id } = useParams();
    const { data: product } = useSWR(`findProduct/${id}`, getProductById)
    return (
        <div>
            {
                product &&
                <UpdateProductForm product={product} />
            }
        </div>
    )
}

export default UpdateProductPage

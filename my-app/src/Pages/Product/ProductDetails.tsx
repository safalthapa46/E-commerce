import React from 'react'
import ProductDetails from '../../component/Product/ProductDetail'
import { useParams } from 'react-router-dom'

const SingleDetails = () => {
    const params = useParams()
    const id= params.id
console.log(params)
    return (
        <div>{
            
            id &&
            <ProductDetails id={id} />
            
            }
        </div>
    )
}

export default SingleDetails

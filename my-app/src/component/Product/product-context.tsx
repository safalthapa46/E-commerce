import useSWR from 'swr'
// import { getRelatedProduct } from '../../API/productApi'
import { Link } from 'react-router-dom'
 import { displayImage } from '../../utils/helper'
import { getRelatedProduct } from '../../api/productApi'

interface Props {
    id: string 
}

const RelatedProducts = ({id}: Props) => {
    const { data: products} = useSWR(`relatedproduct/${id}`, getRelatedProduct);

    console.log(products)

  return (
    <div className="grid grid-cols-4 gap-10 p-10">
      {
        products?.map((product) => (
          <div key={product._id} className="border p-5 rounded-lg space-y-5 shadow-xl">
            <div className="flex items-center justify-center">
              <img src={displayImage(product.productImage)} 
              alt={product.productName} 
              className="h-32 w-32" />
            </div>
            <div className="border-t mt-2">
              <p className="font-bold capitalize">{product?.productCategory?.categoryName}</p>
              <p className="line-clamp-1">{product.productName}</p>
              <div><span className="font-bold">Rating:</span> {product.productRating}</div>
              <p><span className="font-bold">Price:</span> {product.productPrice}</p>
              <p className="line-clamp-2">{product.productDescription}</p>
            </div>
            <div>
              <Link className="bg-blue-700 text-white px-4 py-2 rounded-lg " to={`/products/${product._id}`}>
                View Details
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default RelatedProducts
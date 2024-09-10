import React, { useCallback, useState } from 'react'
// import { getProducts } from '../../../API/productApi'
import useSWR, { mutate } from 'swr'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../src/@/components/ui/table"
import { displayImage, errorMessage } from '../../../utils/helper'
import Button from '../../../component/reusable/button/button'
import { Link } from 'react-router-dom'
import DeleteModal from './delete-Modal'
import { getProducts } from '../../../api/productApi'
import { AppConfig } from '../../../config/app.config'
import { toast } from 'sonner'
import axios from 'axios'
import { IProducts } from '../../../interface/Product'
// import DeleteModal from './delete-modal'

type IModal = "update" | " delete"

const GetProduct = () => {
  const [modal, setModal] = useState<IModal | null>(null);
  const { data: products } = useSWR('getproduct', getProducts)
  const [product, setProduct] = useState<IProducts | null>(null)

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const { data } = await axios.delete(`${AppConfig.API_URL}/deleteProduct/${id}`)
      const updateProduct= products?.filter((p)=> p._id !== product?._id)
      mutate('getproduct', updateProduct)
      toast.message(data.message)
      setModal(null)
    } catch (error) {
      toast.error(errorMessage(error))
    }
  }, [])

  return (
    <div>
      <div className='my-2 flex justify-end'>
        <Link to={"/dashboard/add-product"}>
          <Button
            buttonType={'button'}
            buttonColor={{
              primary: true,
            }}>
            Add Product
          </Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.N</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Product Image</TableHead>
            <TableHead>Product Category</TableHead>
            <TableHead>Product Description</TableHead>
            <TableHead>Product Price</TableHead>
            <TableHead>Total Products</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, idx) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium text-center">{idx + 1}</TableCell>
              <TableCell className="font-medium">{product.productName}</TableCell>
              <TableCell className="w-[400px]">
                <img src={displayImage(product.productImage)}
                  alt={product.productName}
                  className="h-32 w-32" />
              </TableCell>
              <TableCell>{product.productCategory?.categoryName}</TableCell>
              <TableCell>{product.productDescription}</TableCell>
              <TableCell>{product.productPrice}</TableCell>
              <TableCell>{product.totalProduct}</TableCell>
              <TableCell className=''>
                <div className='flex items-center gap-2'>
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <Button
                      buttonType={'submit'}
                      buttonColor={{
                        primary: true,
                      }}>
                      Update
                    </Button>
                  </Link>
                  <Button
                    buttonType={'button'}
                    buttonColor={{
                      secondary: true,
                    }} onClick={()=>{setModal(" delete"); setProduct(product)}}>
                    Delete
                  </Button>
                  {/* <DeleteModal onDelete={()=> deleteProduct(product._id)} /> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
      {
        product && 
        <DeleteModal open={modal === " delete"}
        onClose={()=> setModal(null)}
        onDelete={()=> deleteProduct(product._id)} />
      }

      {/* Modal */}
      {/* <DeleteModal /> */}

    </div>
  )
}

export default GetProduct
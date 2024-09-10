import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form"

import axios from "axios";

import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

import { toast } from "sonner";

import Button from "../../../../component/reusable/button/button";
import { AppConfig } from "../../../../config/app.config";
import { displayImage, errorMessage } from "../../../../utils/helper";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../../@/components/select";
import useSWR from "swr";
// import { getCategory } from "../../../API/categoryApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategory } from "../../../../api/categoryApi";
import { getProductById, getProducts } from "../../../../api/productApi";
import { IProducts } from "../../../../interface/Product";


interface IProductForm {
  product_name: string,
  product_price: number,
  product_description: string,
  product_rating: number,
  product_category: string,
  total_product: number,
  product_image?:any
}

interface Props{
  product:IProducts
}

const UpdateProductForm = ({product}:Props) => {

  const { data: categories } = useSWR("viewcategory", getCategory)
  const navigate =useNavigate()
  // console.log(product)


  const productValidation = yup.object().shape({
    product_name: yup.string().required("Name is required"),
    product_price: yup.number().required("Price is required"),
    product_description: yup.string().required("Description is required"),
    product_rating: yup.number().required("Rating is required"),
    product_category: yup.string().required("Category is required"),
    total_product: yup.number().required("Product is required"),
    product_image: yup.mixed()
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IProductForm>({
    resolver: yupResolver(productValidation),
    defaultValues:{
      product_name:product?.productName || "",
      product_category:product?.productCategory._id || "",
      product_price: Number(product?.productPrice)|| 0,
      product_rating: Number(product?.productRating)|| 0,
      product_description: product?.productDescription || "",
      total_product:product?.totalProduct || 0,
      product_image:product?.productImage || ""
    }
  });


  const onUpdateProduct = useCallback(async (values: IProductForm) => {
    const productImage = values.product_image?.[0]
    const productData = new FormData();

    productData.append('productName', values.product_name);
    productData.append('productPrice', String(values.product_price));
    productData.append('productDescription', String(values.product_description));
    productData.append('productRating', String(values.product_rating));
    productData.append('productCategory', String(values.product_category));
    productData.append('totalProduct', String(values.total_product));
    productData.append('productImage', productImage);
    try {
      const { data } = await axios.put(`${AppConfig.API_URL}/updateProduct/${product._id}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      // console.log(data)
      toast.success(data.response?.message || "Updated successfully")
      navigate('/dashboard/products')
    } catch (error: unknown) {
      toast.error(errorMessage(error))
    }
  }, [product, navigate])

  return (
    <div>
      <div className='my-2 flex justify-end'>
        <Link to={"/dashboard/products"}>
        <Button
        buttonType={'button'}
        buttonColor={{
          primary: true,
        }}>
          Go Back
        </Button>
        </Link>
      </div>

      

      <form className="max-w-sm mx-auto border rounded-lg" onSubmit={handleSubmit(onUpdateProduct)}>

      <div >
        <img src={displayImage(product?.productImage)} alt={product?.productName} className="h-[200px] w-[200px] mx-auto" />
      </div>

      
        <div className="m-5">
          <div className="mb-5">
            <label htmlFor="productname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input type="text"
              id="productname"
              {...register("product_name")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.product_name &&
              <span className="text-red-600">{errors.product_name.message}</span>
            }
          </div>

          <div className="mb-5">
            <label htmlFor="productprice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
            <input type="number"
              id="productprice"
              {...register("product_price")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.product_price &&
              <span className="text-red-600">{errors.product_price.message}</span>
            }
          </div>

          <div className="mb-5">
            <label htmlFor="productdescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
            <input type="text"
              id="productdescription"
              {...register("product_description")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.product_description &&
              <span className="text-red-600">{errors.product_description.message}</span>
            }
          </div>

          <div className="mb-5">
            <label htmlFor="productrating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Rating</label>
            <input type="number"
              id="productrating"
              {...register("product_rating")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.product_rating &&
              <span className="text-red-600">{errors.product_rating.message}</span>
            }
          </div>

          {/* <div className="mb-5">
            <label htmlFor="productcategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category</label>
            <input
              id="productcategory"
              {...register("product_category")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.product_category &&
              <span className="text-red-600">{errors.product_category.message}</span>
            }
          </div> */}

          <div className="mb-5">
            <label htmlFor="totalproduct" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Product</label>
            <input type="number"
              id="totalproduct"
              {...register("total_product")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            {
              errors.total_product &&
              <span className="text-red-600">{errors.total_product.message}</span>
            }
          </div>
          <div>
            <label htmlFor="product_category">Product Category</label>
            <Controller
              name = "product_category"
              control = {control}
              render = {({field}) => (
                <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {
                    categories?.map((category) => (
                      <SelectItem value={category._id}>{category.categoryName}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
              )}
            />
          </div>

          <div className="mt-5">
            <input
            {...register("product_image")}
              type="file"
              accept="image/*"
             
            />
          </div>
          <div className="mt-8">
            <Button
              buttonType={'submit'}
              buttonColor={{
                primary: true,
              }}>
              Update Product
            </Button>

          </div>
        </div>
      </form>

    </div>
  )
}

export default UpdateProductForm
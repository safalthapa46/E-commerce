import React, { useCallback, useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../../@/components/ui/table'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
// import { getOrderProducts, setRemoveProduct, updateProductToCart } from '../../../redux/slice/order-slice';
// import { IOrder } from '../../../interface/order';
import { toast } from 'sonner';
import axios from 'axios';
import { AppConfig } from '../../../config/app.config';
import { errorMessage } from '../../../utils/helper';
import { getOrderProducts, setRemoveProduct, updateProductToCart } from '../../../redux/Slice/Order-slice';
import { IOrder } from '../../../interface/Order';
import { Link } from 'react-router-dom';
import Button from '../../../component/reusable/button/button';
import { useAuth } from '../../../hooks/useAuth';
// import { Button } from 'flowbite-react';

const Cart = () => {
    const [totalOrder, setTotalOrder] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const dispatch = useAppDispatch();
    const { orderProducts } = useAppSelector((store) => store.order)
    const {userId} = useAuth()

    useEffect(() => {
        const order = orderProducts.reduce((accumulator, currentValue) => accumulator + currentValue.totalOrder, 0)
        const amount = orderProducts.reduce((accumulator, currentValue) => accumulator + currentValue.totalOrder * Number(currentValue.product.productPrice), 0)

        setTotalOrder(order)
        setTotalPrice(amount)

    }, [orderProducts])

    useEffect(() => {
        dispatch(getOrderProducts())
    }, [dispatch])

    const increaseOrder = useCallback((order: IOrder) => {
        let product = order.totalOrder

        const update = {
            orderId: order._id,
            totalOrder: product + 1
        }
        dispatch(updateProductToCart(update))
        toast.success("Updated to cart")
    }, [dispatch])


    const decreaseOrder = useCallback(async (order: IOrder) => {
        let product = order.totalOrder
        if (product > 0) {
            const update = {
                orderId: order._id,
                totalOrder: product - 1
            }
            dispatch(updateProductToCart(update))
            toast.success("Updated to cart")
        } else {
            try {
                await axios.delete(`${AppConfig.API_URL}/delete-order/${order._id}`)
            } catch (error) {
                toast.error(errorMessage(error))
            }
            dispatch(setRemoveProduct(order))
            toast.success("Deleted from cart")
        }
    }, [dispatch])

    const handleCreateOrderRequest = useCallback(async () => {
        try {
            const { data } = await axios.post(`${AppConfig.API_URL}/order-request`, {
                products : orderProducts.map((o)=>o.product._id),
             totalOrder:totalOrder,
             totalPrice:totalPrice,
             userId: userId
            })
            toast.success("order requested Successfully")
        } catch (error) {
            toast.error(errorMessage(error))

        }
    }, [totalOrder , totalPrice , userId , orderProducts])

    return (
        <div>
            <div className='my-6 flex justify-between items-center pb-4 px-4 border-b'>
                <h6 className='text-2xl fonr-bold'>Cart</h6>

                <Button
                    buttonType={'button'}
                    buttonColor={{
                        primary: true,
                    }}
                    onClick={handleCreateOrderRequest}>
                    Create Order
                </Button>

            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">S.N</TableHead>
                        <TableHead>Product name</TableHead>
                        <TableHead>Product price</TableHead>
                        <TableHead>Total amount</TableHead>
                        <TableHead>Total order</TableHead>
                        <TableHead className='w-[200px]'>Action</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderProducts.map((order, idx) => (
                        <TableRow key={order?._id}>
                            <TableCell className="font-medium">{idx + 1}</TableCell>
                            <TableCell className="font-medium">{order?.product?.productName}</TableCell>
                            <TableCell>{order?.product?.productPrice}</TableCell>
                            <TableCell>{Number(order?.product?.productPrice) * Number(order?.totalOrder)}</TableCell>
                            <TableCell className="">{order?.totalOrder}</TableCell>
                            <TableCell className="">
                                <div className='flex items-center border w-[150px] rounded-[6px] overflow-hidden'>
                                    <button type='button'
                                        className='bg-red-500 px-4 text-white text-xl font-bold w-full'
                                        onClick={() => decreaseOrder(order)}
                                    >
                                        -
                                    </button>
                                    <span className='px-2 w-full text-center'>{order.totalOrder}</span>
                                    <button type='button'
                                        className='bg-blue-500 px-4 text-white text-xl font-bold w-full'
                                        onClick={() => increaseOrder(order)}
                                    >
                                        +
                                    </button>
                                </div>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="text-xl font-bold">Total</TableCell>
                        <TableCell className="text-xl font-bold">{totalPrice}</TableCell>
                        <TableCell colSpan={3} className="text-xl font-bold">{totalOrder}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default Cart
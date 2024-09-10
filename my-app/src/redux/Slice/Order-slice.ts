import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppConfig } from "../../config/app.config";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { IOrder } from "../../interface/Order";
import { IUser } from "../../interface/User";
import { IProducts } from "../../interface/Product";

export interface IOrderRequest{
    _id: string
    orderStatus: 'shipping' | 'payment' | 'delivered' | 'cancelled'
    products: IProducts[]
    shippingAddress: {
        user: IUser,
        address: string
    }
}

interface IInitialState {
    orderProducts: IOrder[],
    orderRequest: IOrderRequest | null,
    orderRequests: IOrderRequest[]
}

const initialState: IInitialState = {
    orderProducts: [],
    orderRequest: null,
    orderRequests: []

}

export const getOrderProducts = createAsyncThunk(
    'product-orders',
    async () => {
        const { userId } = useAuth()
        try {
            const { data } = await axios.get(`${AppConfig.API_URL}/get-order/${userId}`)

            return {
                success: true,
                message: "Successful",
                data
            }
        } catch (error) {
            return {
                success: false,
                message: "Failed to get orders"
            }
        }
    }
)

export const addProductToCart = createAsyncThunk(
    'add-product',
    async ({ productId, totalOrder }: { productId: string, totalOrder: number }) => {
        const { userId } = useAuth()
        try {
            const { data } = await axios.post(`${AppConfig.API_URL}/create-order/`, {
                userId: userId,
                productId,
                totalOrder: totalOrder
            })

            return {
                success: true,
                message: "Added to cart",
                data
            }
        } catch (error) {
            return {
                success: false,
                message: "Failed to get orders"
            }
        }
    }
)

export const updateProductToCart = createAsyncThunk(
    'update-cart',
    async ({ orderId, totalOrder }: { orderId: string, totalOrder: number }) => {
        const { accessToken } = useAuth()
        try {
            const { data } = await axios.put(`${AppConfig.API_URL}/update-order/${orderId}`,
                {
                    headers: {
                        'Authorization': `Bearer${accessToken}`
                    },
                    totalOrder: totalOrder
                }
            )

            return {
                success: true,
                message: "Updated to cart",
                data
            }
        } catch (error) {
            return {
                success: false,
                message: "Failed to update order"
            }
        }
    }
)



export const getOrderRequest = createAsyncThunk(
    'order-request',
    async () => {
      const { userId } = useAuth()
      try {
        const { data } = await axios.get(`${AppConfig.API_URL}/order-request/user/${userId}`)
        return {
          success: true,
          message: "Successful",
          data
        }
  
      } catch (error) {
        return {
          success: false,
          message: "Failed to get orders"
        }
      }
    }
  )
  
  export const getOrderRequestById = createAsyncThunk(
    'order-request-by-id',
    async (id: string) => {
      try {
        const { data } = await axios.get(`${AppConfig.API_URL}/order-request/${id}`)
        return {
          success: true,
          message: "Successful",
          data
        }
  
      } catch (error) {
        return {
          success: false,
          message: "Failed to get orders"
        }
      }
    }
  )





export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setRemoveProduct: (state, action: PayloadAction<IOrder>) => {
            const updatedProduct = action.payload;
            const orders = state.orderProducts;
            const removeOrder = orders.filter((o) => o._id !== updatedProduct._id)
            state.orderProducts = removeOrder
        }
    },
    extraReducers(builder) {
        builder.addCase(getOrderProducts.fulfilled, (state, action) => {
            state.orderProducts = action.payload.data
        })
        builder.addCase(addProductToCart.fulfilled, (state, action) => {
            const product = action.payload.data;
            state.orderProducts.push(product)
        })
        builder.addCase(updateProductToCart.fulfilled, (state, action) => {
            if (action.payload.success) {
                const updatedProduct = action.payload.data;
                const orders = state.orderProducts;
                if (updatedProduct) {
                    const index = orders.findIndex((o) => o._id === updatedProduct._id);
                    if (index !== -1) {
                        orders[index] = updatedProduct;
                    }
                }
            }
        })
        builder.addCase(getOrderRequest.fulfilled, (state, action) => {
            state.orderRequests = action.payload.data as IOrderRequest[]
          })
          builder.addCase(getOrderRequestById.fulfilled, (state, action) => {
            state.orderRequest = action.payload.data
          })
    },
})

export const { setRemoveProduct } = OrderSlice.actions;
export default OrderSlice.reducer;
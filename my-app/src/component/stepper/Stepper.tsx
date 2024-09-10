import classNames from "classnames";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getOrderRequest, getOrderRequestById } from "../../redux/Slice/Order-slice";
import { useParams } from "react-router-dom";

const Stepper = () => {
    const {id} = useParams()

    const dispatch = useAppDispatch()
    const {orderRequest}  = useAppSelector((store) => store.order)
    console.log(orderRequest)

    useEffect(() => {
        if(id){
            dispatch(getOrderRequestById(id))
        }
    }, [dispatch, id])
    
    const steps = [
        {
            name: "Shipping",
            isActive: orderRequest?.orderStatus === "shipping"
        },
        {
            name: "Payment",
            isActive : orderRequest?.orderStatus === "payment"
        },
        {
            name: "Delivered",      
            isActive:  orderRequest?.orderStatus === "delivered"
        },
    ]

    console.log(steps)

    return (
        <div className="flex items-center justify-center gap-40 my-20">
            {
                steps.map((step, idx) => (
                    <div
                    key = {idx}
                    className= {classNames(
                        'px-4 py-2 rounded-xl text-white  ',
                        step.isActive ? "bg-blue-700" : "bg-rose-800"
                    )}
                    >
                        {step.name}
                    </div>
                ))
            }
        </div>
    )
}

export default Stepper
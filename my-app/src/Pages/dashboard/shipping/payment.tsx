import React, { useEffect, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import axios from 'axios';
import { AppConfig } from '../../../config/app.config';
import Button from '../../../component/reusable/button/button';
import { toast } from 'sonner';
import { errorMessage } from '../../../utils/helper';
import { getOrderRequestById } from '../../../redux/Slice/Order-slice';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';

const stripePromise = loadStripe(`${AppConfig.STRIPE_PUBLIC_KEY}`);

interface Props {
  orderId: string
}

interface PaymentFormProps {
  clientSecret: string;
  orderId: string
}

/* *********** Stripe Payment ************* */
const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret, orderId }) => {
    const {id} = useParams()
  const dispatch = useAppDispatch()

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errormessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `/payment-success`,
      },
    });

    if (error) {
      toast.error(error.message || 'An unexpected error occurred.');
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
    try {
      await axios.put(`${AppConfig.API_URL}/order-request/${orderId}`, {
        orderStatus: "delivered",
      })
      if (id) {
        dispatch(getOrderRequestById(id))
      }
      toast.success("Payment successful")
    } catch (error) {
      toast.error(errorMessage(error))
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errormessage && <div className="error">{errormessage}</div>}
      <div className='mt-5'>
        <Button
          buttonType={"submit"}
          buttonColor={{
            primary: true,
          }}
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </form>
  );
};

/* ********** Payment ********** */
const Payment = ({ orderId }: Props) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.put(`${AppConfig.API_URL}/stripe-payment`, {
          requestId: orderId
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    createPaymentIntent();
  }, [orderId]);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || '',
  };

  return (
    <div>
      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={options}
        >
          <PaymentForm
            clientSecret={clientSecret}
            orderId={orderId}
          />
        </Elements>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Payment;
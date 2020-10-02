import React, { useState, useEffect } from 'react';
import './Payment.scss';
import { useStateValue } from 'context/StateProvider';
import CheckoutProduct from 'components/checkout/CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from 'context/reducer';
import axios from 'api/axios';
import { db } from 'firebaseConfig';

const Payment = () => {
    const history = useHistory();
    const [ { basket, user }, dispatch ] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [ succeeded, setSucceeded ] = useState( false );
    const [ processing, setProcessing ] = useState( "" );
    const [ error, setError ] = useState( null );
    const [ disabled, setDisabled ] = useState( true );
    const [ clientSecret, setClientSecret ] = useState( true );

    useEffect( () => {
        // generate special stripe secret which allows us to charge the
        // customer

        const getClientSecret = async () => {
            // stripe expects the total in a currencies subunits
            const response = await axios.post( `/payments/create?total=${ getBasketTotal( basket ) * 100 }` );

            setClientSecret( response.data.clientSecret );

        };

        getClientSecret();
    }, [ basket ] );

    console.log( 'Secret is >>> ', clientSecret );

    const handleSubmit = async event => {
        // stripe logic
        event.preventDefault();
        setProcessing( true );

        await stripe.confirmCardPayment( clientSecret, {
            payment_method: {
                card: elements.getElement( CardElement )
            }
        } ).then( ( { paymentIntent } ) => {
            // paymentIntent = payment Confirmation

            db
                .collection( 'users' )
                .doc( user?.uid )
                .collection( 'orders' )
                .doc( paymentIntent.id )
                .set( {
                    basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created

                } );

            setSucceeded( true );
            setError( null );
            setProcessing( false );

            dispatch( {
                type: 'EMPTY_BASKET'
            } );
            history.replace( '/orders' );
        } );


    };

    const handleChange = e => {
        // Listen to CardElement
        // and display any errors as the customer types their card
        // details.
        setDisabled( e.empty );
        setError( e.error ? e.error.message : '' );
    };
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'>{ basket?.length } items</Link>)
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{ user?.email || 'Guest' }</p>
                        <p>123, React</p>
                        <p>LA</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        { basket.map( item => (
                            <CheckoutProduct key={ item.id } { ...item } />
                        ) ) }
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* Stripe logic */ }
                        <form onSubmit={ handleSubmit }>
                            <CardElement onChange={ handleChange } />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={ ( value ) =>
                                        (
                                            <h3>Order Total: {value }</h3>
                                        )
                                    }
                                    decimalScale={ 2 }
                                    value={ getBasketTotal( basket ) }
                                    displayType={ 'text' }
                                    thousandSeparator={ true }
                                    prefix={ 'INR' }
                                />
                                <button disabled={ processing || disabled || succeeded }>
                                    <span>{ processing ? <p>Processing</p> : 'Buy Now' }</span>
                                </button>
                            </div>

                            { error && <div>{ error }</div> }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;

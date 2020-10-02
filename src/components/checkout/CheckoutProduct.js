import React from 'react';
import './CheckoutProduct.scss';
import { useStateValue } from 'context/StateProvider';

const CheckoutProduct = ( { id, image, title, price, rating, hideButton } ) => {
    const [ dispatch ] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from Basket
        dispatch( {
            type: 'REMOVE_FROM_BASKET',
            id
        } );

    };
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={ image } alt='' />
            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{ title }</p>
                <p className='checkoutProduct__price'>
                    <small>INR</small>
                    <strong>{ price }</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    { Array( rating ).fill().map( ( _, i ) => <span role='img' aria-label='rating' key={ i }>⭐</span> ) }
                </div>
                { !hideButton && <button onClick={ removeFromBasket }>Remove from Basket</button> }
            </div>
        </div>
    );
};

export default CheckoutProduct;

import React from 'react';
import './Subtotal.scss';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from 'context/StateProvider';
import { getBasketTotal } from 'context/reducer';
import { useHistory } from 'react-router-dom';

const Subtotal = () => {
    const history = useHistory();
    const [ { basket } ] = useStateValue();
    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={ ( value ) =>
                    ( <>
                        <p>
                            Subtotal: ({ basket.length } items): <strong>{ value }</strong>
                        </p>
                        <small className='subtotal__gift'>
                            <input type='checkbox' />This order contains a gift
                        </small>

                    </> )
                }
                decimalScale={ 2 }
                value={ getBasketTotal( basket ) }
                displayType={ 'text' }
                thousandSeparator={ true }
                prefix={ 'INR' }
            />
            <button onClick={ () => history.push( '/payment' ) }>Proceed to Checkout</button>
        </div >
    );
};

export default Subtotal;

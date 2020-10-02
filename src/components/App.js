import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import Home from 'components/home/Home';
import Checkout from 'components/checkout/Checkout';
import Login from 'components/Login';
import Payment from 'components/Payment';
import Orders from 'components/order/Orders';
import { auth } from 'firebaseConfig';
import { useStateValue } from 'context/StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe( 'pk_test_51HSDn3G4ikBjFPZQwlS7qGKrr8Zc6CO2trocZoACpRnQd29FBW9LbYyT5hT56cXtJdvsnU3w3UaL38iOgTUtWDbs00Ga6Ij5tt'
);

function App() {

  const [ { basket }, dispatch ] = useStateValue();
  useEffect( () => {
    // Will only run once when the app component loads...
    auth.onAuthStateChanged( authUser => {
      if ( authUser ) {
        // the user just logged in / the user was logged in
        dispatch( {
          type: 'SET_USER',
          user: authUser
        } );
      } else {
        // the user is logged out
        dispatch( {
          type: 'SET_USER',
          user: null
        } );
      }
    } );
  }, [] );
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={ promise }>
              <Payment />
            </Elements>
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;

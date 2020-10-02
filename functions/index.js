const functions = require( 'firebase-functions' );
const express = require( 'express' );
const cors = require( 'cors' )( { origin: true } );
const stripe = require( 'stripe' )( functions.config().stripe_service.stripe_key );

// API

// App config
const app = express();

// Middlewares
app.use( cors );
app.use( express.json() );

// API routes
app.get( '/', ( request, response ) => {
    response.status( 200 ).send( 'Hello World' );
} );

app.post( '/payments/create', async ( request, response ) => {
    const total = request.query.total;

    console.log( 'Payment request recieved of amount >>> ', total );

    const paymentIntent = await stripe.paymentIntents.create( {
        amount: total, // subunits of the currency
        currency: 'inr'
    } );
    response.header( "Access-Control-Allow-Origin", "*" );
    response.status( 201 ).send( {
        clientSecret: paymentIntent.client_secret
    } );
} );

// listen command
exports.api = functions.https.onRequest( app );
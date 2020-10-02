import React from 'react';
import './Home.scss';
import Product from 'components/home/Product';

function Home() {
    return (
        <div className='home'>
            <div className='home__container'>
                <img
                    className='home__image'
                    src='https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Xiaomi/Redmi_Note9Pro_Max/Available_Now/Per_Daycallout/TallHero_1500X600_1._CB405352815_.jpg'
                    alt=''
                />

                <div className='home__row'>
                    <Product
                        id={ 1 }
                        title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses'
                        price={ 29.99 }
                        image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                        rating={ 5 } />
                    <Product
                        id={ 2 }
                        title='boAt BassHeads 100 in-Ear Wired Earphones with Super Extra Bass, in-line Mic, Hawk Inspired Design and Perfect Length Cable (Black)'
                        price={ 3.99 }
                        image='https://images-eu.ssl-images-amazon.com/images/I/31IdiM9ZM8L._AC_US160_FMwebp_QL70_.jpg'
                        rating={ 4 }
                    />

                </div>
                <div className='home__row'>
                    <Product
                        id={ 3 }
                        title='Redmi 9 (Carbon Black, 4GB RAM, 64GB Storage)'
                        price={ 89.99 }
                        image='https://images-eu.ssl-images-amazon.com/images/I/41Ki5S4HEoL._AC_US160_FMwebp_QL70_.jpg'
                        rating={ 5 }
                    />
                    <Product
                        id={ 4 }
                        title='OnePlus Bullets Wireless Z in-Ear Bluetooth Earphones with Mic (Black)'
                        price={ 19.99 }
                        image='https://images-eu.ssl-images-amazon.com/images/I/31peh6pTVKL._AC_US160_FMwebp_QL70_.jpg'
                        rating={ 4 }
                    />
                    <Product
                        id={ 5 }
                        title='Samsung Galaxy M21 (Midnight Blue, 4GB RAM, 64GB Storage)'
                        price={ 139.99 }
                        image='https://images-eu.ssl-images-amazon.com/images/I/41xg1z2h-uL._AC_US160_FMwebp_QL70_.jpg'
                        rating={ 4 }
                    />
                </div>
                <div className='home__row'>
                    <Product
                        id={ 6 }
                        title='Samsung Galaxy M31 (Ocean Blue, 6GB RAM, 128GB Storage)'
                        price={ 179.99 }
                        image='https://images-eu.ssl-images-amazon.com/images/I/41+xWzgV8jL._AC_US160_FMwebp_QL70_.jpg'
                        rating={ 4 }
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;

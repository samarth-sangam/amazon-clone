import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from 'context/StateProvider';
import { auth } from 'firebaseConfig';
const Header = () => {
    const [ { basket, user } ] = useStateValue();

    const handleAuthentication = () => {
        if ( user ) {
            auth.signOut();
        }
    };
    return (
        <div className='header'>
            <Link to='/'>
                <img src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='' className='header__logo' />
            </Link>

            <div className='header__search'>
                <input className='header__searchInput' type='text' />
                <SearchIcon className='header__searchIcon' />
            </div>

            <div className='header__nav'>
                { !user ? <Link to={ '/login' }>
                    <div onClick={ handleAuthentication } className='header__option'>

                        <span className='header__optionLineOne'>Hello { !user ? 'Guest' : user.email }</span>
                        <span className='header__optionLineTwo'>{ user ? 'Sign Out' : 'Sign In' }</span>

                    </div>
                </Link> : <div onClick={ handleAuthentication } className='header__option'>

                        <span className='header__optionLineOne'>Hello { !user ? 'Guest' : user.email }</span>
                        <span className='header__optionLineTwo'>{ user ? 'Sign Out' : 'Sign In' }</span>

                    </div> }
                <Link to='/orders'>
                    <div className='header__option'>
                        <span className='header__optionLineOne'>Returns</span>
                        <span className='header__optionLineTwo'>& Orders</span>
                    </div>
                </Link>
                <div className='header__option'>
                    <span className='header__optionLineOne'>Your</span>
                    <span className='header__optionLineTwo'>Prime</span>
                </div>

                <Link to='/checkout'>
                    <div className='header__optionBasket'>
                        <ShoppingBasketIcon className='' />
                        <span className='header_optionLineTwo header_basketCount'>{ basket?.length }</span>
                    </div>
                </Link>
            </div>
        </div >
    );
};

export default Header;

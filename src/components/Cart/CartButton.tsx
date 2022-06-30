import { useState } from 'react';
import classes from './CartButton.module.css';

const CartButton = () => {
    const [showCart, setShowCart]= useState(false);
    const handleClick = ()=> {
        setShowCart(true);
    }
    return (
      <button className={classes.button} onClick={handleClick} >
   
        <span>Your Cart</span>
        <span className={classes.badge}>2323</span>
      </button>
    );
}
export default CartButton;
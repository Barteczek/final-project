import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/cartRedux.js';

import styles from './Checkout.module.scss';

const Component = ({className, children, cart}) => {

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const calculateSubtotal = () => {
      let value = 0;
      cart.forEach(product => {
        value += product.count * product.price;
      })
      setSubtotal(value);
    }

    calculateSubtotal()
  });

  return (
    <div className={clsx(className, styles.root, 'container')}>
      <h2>Checkout</h2>
      <div className={styles.productsWrapper}>
      {cart.map(product => (
        <div key={product._id} className={styles.product}>
          <div>
            <img src={product.img} alt={product.name}/>
          </div>
          <div>
            <h5>{product.name}</h5>
            <span>{product.count} x ${product.price}</span>
          </div>
          <h6>${product.count * product.price}</h6>
        </div>  
      ))}
      </div>
      <h3>Subtotal: {subtotal}</h3>
      <form>
        <input type='text'/>
      </form>
      {cart.length > 0 ? 
      <a href='/checkout'>
        <button className={styles.checkoutButton}>
          Pay
        </button> 
      </a> : null}
      {children}
    </div>
  );
}


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.array,
};

const mapStateToProps = state => ({
  cart: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Checkout,
  Container as Checkout,
  Component as CheckoutComponent,
};

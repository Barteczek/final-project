import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/cartRedux.js';

import styles from './Cart.module.scss';

import { CartProduct } from '../../features/CartProduct/CartProduct';

const Component = ({className, children, cart}) => (
  <div className={clsx(className, styles.root, 'container')}>
    <h2>Your Cart</h2>
    {cart.map(product => (
      <CartProduct key={product._id} {...product} />
    ))}
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.array,
};

const mapStateToProps = state => ({
  cart: getAll(state),
});


const Container = connect(mapStateToProps)(Component);

export {
  // Component as Cart,
  Container as Cart,
  Component as CartComponent,
};
